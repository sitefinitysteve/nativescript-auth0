import Bundle = android.os.Bundle;

@JavaProxy('com.test.Activity')
export class TestActivity extends android.app.Activity {
    public onCreate(savedInstanceState?: Bundle): void {
        super.onCreate(savedInstanceState);
    }
}