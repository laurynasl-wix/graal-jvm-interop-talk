package examples.rabbitmq;

public interface MessageQueue {
    void init();

    void addConsumer(
            String queueName, 
            Handler handler
    );

    interface Handler {
        void handle(String message);
    }
}
