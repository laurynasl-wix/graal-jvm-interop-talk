package examples;

import com.rabbitmq.client.CancelCallback;

public class NOOPCancelCallback implements CancelCallback {
    @Override
    public void handle(String consumerTag) {
        
    }
}
