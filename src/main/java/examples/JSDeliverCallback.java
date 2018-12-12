package examples;

import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;
import interop.core.BoundJSCallback;

public class JSDeliverCallback implements DeliverCallback {
    
    private final BoundJSCallback<Delivery, Void> jsCallback;

    public JSDeliverCallback(BoundJSCallback<Delivery, Void> jsCallback) {
        this.jsCallback = jsCallback;
    }

    @Override
    public void handle(String consumerTag, Delivery message) {
        jsCallback.apply(message, null);
    }
}
