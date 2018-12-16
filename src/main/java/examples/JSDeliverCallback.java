package examples;

import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;

import java.util.concurrent.CompletionStage;
import java.util.function.Function;

public class JSDeliverCallback implements DeliverCallback {

    private final Function<Object[], CompletionStage<Object>> jsCallback;

    public JSDeliverCallback(Function<Object[], CompletionStage<Object>> jsCallback) {
        this.jsCallback = jsCallback;
    }

    @Override
    public void handle(String consumerTag, Delivery message) {
        jsCallback.apply(new Object[]{null, message});
    }
}
