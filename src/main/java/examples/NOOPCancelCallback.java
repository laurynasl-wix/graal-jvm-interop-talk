package examples;

import com.rabbitmq.client.CancelCallback;
import com.rabbitmq.client.DeliverCallback;
import com.rabbitmq.client.Delivery;
import interop.core.BoundJSCallback;

public class NOOPCancelCallback implements CancelCallback {
    @Override
    public void handle(String consumerTag) {
        
    }
}
