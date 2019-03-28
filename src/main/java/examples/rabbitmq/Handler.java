package examples.rabbitmq;

public interface Handler {
    void handle(String message);
}
