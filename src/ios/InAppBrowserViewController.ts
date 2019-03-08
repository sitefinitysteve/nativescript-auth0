import { TransactionStore } from './transactionStore';
import { AuthSession } from './authSession';
import {
    WebAuthOptions, CredentialsExtrasKey
} from './../auth0-common';


export class InAppBrowserViewController extends UIViewController {

    private navigationBar: UINavigationBar;
    private webView: WKWebView;
    private _userContentController: WKUserContentController;
    private url: NSURL;
    private options: WebAuthOptions;
    private redirectUri: string;
    private navigationDelegate: WKNavigationDelegate;

    private _hud: any;

    public viewDidLoad() {
        super.viewDidLoad();

        let statusBarHeight = UIApplication.sharedApplication.statusBarFrame.size.height;
        
        
        let barButtonItem = UINavigationItem.alloc().initWithTitle("Cargando....");

        let cancelButton = UIBarButtonItem.alloc().initWithTitleStyleTargetAction("Cancel", UIBarButtonItemStyle.Plain, this, "cancel");
        barButtonItem.leftBarButtonItem = cancelButton;        

        this.navigationBar = UINavigationBar.alloc().initWithFrame(CGRectMake(0, statusBarHeight, this.view.frame.size.width, 40));

        this.navigationBar.items = NSArray.arrayWithObject(barButtonItem);

        this.view.addSubview(this.navigationBar); 
        

        this._userContentController = WKUserContentController.new();

        this.includeInitJavascript(this._userContentController);
        

        
        //const frame = CGRectMake(0, statusBarHeight+this.navigationBar.frame.size.height, this.view.frame.size.width, this.view.frame.size.height-this.navigationBar.frame.size.height-statusBarHeight);

        const frame = CGRectMake(0, 20, this.view.frame.size.width, this.view.frame.size.height-statusBarHeight);
        const config = WKWebViewConfiguration.new();
        config.userContentController = this._userContentController;
        this.webView = WKWebView.alloc().initWithFrameConfiguration(frame, config);
        this.webView.loadRequest(NSURLRequest.alloc().initWithURL(this.url));
        
        this.navigationDelegate = WKNavigationDelegateImpl.initWithOwner(this);
        this.webView.navigationDelegate = this.navigationDelegate;
        this.webView.allowsBackForwardNavigationGestures = true;
        this.view.addSubview(this.webView); 
        
        this.webView.hidden=true;
        this.webView.translatesAutoresizingMaskIntoConstraints=false;
        this.view.translatesAutoresizingMaskIntoConstraints=false;

     }

    // ---------------------------------------------------
    // These methods need to be exposed otherwise the runtime wouldn't find them
    // ---------------------------------------------------

    public loadUrl(url:NSURL):void{
        this.url=url;
    }

    public setOptions(options: WebAuthOptions):void{
        this.options=options;
        if (options.hostedPageParameters[CredentialsExtrasKey.REMEMBER]!=null && options.hostedPageParameters[CredentialsExtrasKey.REMEMBER]!="false"){
            NSUserDefaults.standardUserDefaults.setObjectForKey(options.hostedPageParameters[CredentialsExtrasKey.DNI], CredentialsExtrasKey.DNI);
            NSUserDefaults.standardUserDefaults.setObjectForKey(options.hostedPageParameters[CredentialsExtrasKey.USERCODE], CredentialsExtrasKey.USERCODE);
            NSUserDefaults.standardUserDefaults.setObjectForKey(options.hostedPageParameters[CredentialsExtrasKey.USERNAME], CredentialsExtrasKey.USERNAME);
        }
    }

    private includeInitJavascript(userContentController: WKUserContentController): void{
        if (NSUserDefaults.standardUserDefaults.boolForKey(CredentialsExtrasKey.REMEMBER )!=null && NSUserDefaults.standardUserDefaults.boolForKey(CredentialsExtrasKey.REMEMBER)){
            let scriptSource = `loadParameters({"${CredentialsExtrasKey.DNI}": "${NSUserDefaults.standardUserDefaults.stringForKey(CredentialsExtrasKey.DNI)}","${CredentialsExtrasKey.USERCODE}": "${NSUserDefaults.standardUserDefaults.stringForKey(CredentialsExtrasKey.USERCODE)}", "${CredentialsExtrasKey.USERNAME}": "${NSUserDefaults.standardUserDefaults.stringForKey(CredentialsExtrasKey.USERNAME)}"})`;

            let script = WKUserScript.alloc().initWithSourceInjectionTimeForMainFrameOnly(scriptSource, WKUserScriptInjectionTime.AtDocumentEnd, true);
            this._userContentController.addUserScript(script);
        }        
    }

    public setDefaults(remember: boolean, dni?:string , usercode?: string, name?:string): void {
        NSUserDefaults.standardUserDefaults.setBoolForKey(remember, CredentialsExtrasKey.REMEMBER);
        if(remember){
            NSUserDefaults.standardUserDefaults.setObjectForKey(dni, CredentialsExtrasKey.DNI);
            NSUserDefaults.standardUserDefaults.setObjectForKey(usercode, CredentialsExtrasKey.USERCODE);
            NSUserDefaults.standardUserDefaults.setObjectForKey(name, CredentialsExtrasKey.USERNAME);
        } else {
            NSUserDefaults.standardUserDefaults.removeObjectForKey(CredentialsExtrasKey.DNI);
            NSUserDefaults.standardUserDefaults.removeObjectForKey(CredentialsExtrasKey.USERCODE);
            NSUserDefaults.standardUserDefaults.removeObjectForKey(CredentialsExtrasKey.USERNAME);
        }
        
    }

    public cancel(sender: UIButton): void {
        TransactionStore.shared.clear();
        this.dismissViewControllerAnimatedCompletion(true, () => {
            this.dispose();
        });
    }

    public authCancel(): void {
        TransactionStore.shared.clear();
        this.dismissViewControllerAnimatedCompletion(true, () => {
            this.dispose();
        });
    }

    /**
     * dispose
     */
    public dispose(): void {
        if (this.webView) {
            this.webView.dealloc();
        }
    }

    public authOk(url:NSURL): void {
        TransactionStore.shared.resume(url, NSDictionary.dictionary());        
    }

    public static ObjCExposedMethods = {
        "cancel": {returns: interop.types.void, params: [UIButton]}
    };

    public _onLoadFinished(url: string, error?: string) {
        this.webView.hidden=false;
        this.navigationBar.hidden=true;
    }

    public getRememberScript(): string {
        let rememberScript=this.options.parameters.rememberScript;
        return rememberScript;
    }

    public getRememberScriptDelimiter(): string {
        let rememberScriptDelimiter=this.options.parameters.rememberScriptDelimiter;
        return rememberScriptDelimiter;
    }

    public setRedirectUri(uri: string): void{
        this.redirectUri=uri;
    }

    public getRedirectUri(): string{
        return this.redirectUri;
    }


    public getCallbackCancelUri(): string{
        return this.options.parameters.callbackCancelUri;
    }

}

class WKNavigationDelegateImpl extends NSObject implements WKNavigationDelegate {
    static ObjCProtocols = [WKNavigationDelegate];
    private _owner: InAppBrowserViewController;

    static initWithOwner(owner: InAppBrowserViewController): WKNavigationDelegateImpl {
        const handler = <WKNavigationDelegateImpl>WKNavigationDelegateImpl.alloc().init();
        handler._owner = owner;
        return handler;
    }

    webViewDidStartProvisionalNavigation?(webView: WKWebView, navigation: WKNavigation): void{
        //this._owner.get().empezoACargar();
    }

    webViewDidFinishNavigation(webView: WKWebView, navigation: WKNavigation): void {
        if (webView.URL.absoluteString.indexOf("/login")!=-1){
            this._owner._onLoadFinished(webView.URL.absoluteString);
        }
      }

    webViewDecidePolicyForNavigationActionDecisionHandler?(webView: WKWebView, navigationAction: WKNavigationAction, decisionHandler: (p1: WKNavigationActionPolicy) => void): void{
        let callbackUri = this._owner.getRedirectUri();
        if (navigationAction.request.URL.absoluteString.startsWith(callbackUri)){
            if (this._owner.getRememberScript()!=null){
                let scriptSource:string=this._owner.getRememberScript();
                let rememberScriptDelimiter=this._owner.getRememberScriptDelimiter();
                webView.evaluateJavaScriptCompletionHandler(scriptSource, (result: string, error)=>{             
                    if (result!=null && result!="null"){
                        let arreglo: string[]=result.split(rememberScriptDelimiter);
                        if (arreglo[0].indexOf("true")!=-1){
                            this._owner.setDefaults(true, arreglo[1], arreglo[2], arreglo[1]);
                        } else {
                            this._owner.setDefaults(false);
                        }
                    } else {
                        this._owner.setDefaults(false);
                    }     
                    decisionHandler(WKNavigationActionPolicy.Allow); 
                    this._owner.authOk(navigationAction.request.URL);                 
                }); 
            } else {
                    this._owner.setDefaults(false);    
                    decisionHandler(WKNavigationActionPolicy.Allow); 
                    this._owner.authOk(navigationAction.request.URL);  
            }

        } else if (navigationAction.request.URL.absoluteString.startsWith(this._owner.getCallbackCancelUri())){ 

            decisionHandler(WKNavigationActionPolicy.Allow);               
            this._owner.authCancel();
        } else {
            decisionHandler(WKNavigationActionPolicy.Allow);
        }
        
    }   
   
}