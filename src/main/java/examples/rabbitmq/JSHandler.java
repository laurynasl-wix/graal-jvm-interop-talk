package examples.rabbitmq;

import interop.core.BoundJSCallback;

public class JSHandler implements MessageQueue.Handler {
    
    private final BoundJSCallback jsCallback;

    public JSHandler(BoundJSCallback jsCallback) {
        this.jsCallback = jsCallback;
    }

    @Override
    public void handle(String message) {
        jsCallback.apply(new Object[]{message});
    }

    @Override
    public String toString() {
        return "JSHandler(" + jsCallback.toString() + ")";
    }
}
