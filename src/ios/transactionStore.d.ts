import { AuthTransaction } from './authTransaction';
export declare class TransactionStore {
    static shared: TransactionStore;
    private _current?;
    get current(): AuthTransaction;
    resume(url: NSURL, options: NSDictionary<string, any>): boolean;
    store(transaction: AuthTransaction): void;
    cancel(transaction: AuthTransaction): void;
    clear(): void;
}
