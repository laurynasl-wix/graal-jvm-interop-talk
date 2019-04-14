package mq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class RabbitMQ implements MessageQueue {
    private Channel channel;

    @Override
    public void init() {
        try {
            ConnectionFactory factory = new ConnectionFactory();

            factory.setUsername("rabbitmq");
            factory.setPassword("rabbitmq");
            factory.setHost("localhost");
            factory.setPort(5672);

            Connection connection = factory.newConnection();
            channel = connection.createChannel();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void addConsumer(String queueName, Handler handler) {
        try {
            channel.queueDeclare(queueName, false, false, false, null);
            System.out.println("Message handler [" +handler.toString() + "] registered on " + queueName);
            channel.basicConsume(
                    queueName,
                    true,
                    (consumerTag, message) -> handler.handle(new String(message.getBody())),
                    consumerTag -> {
                    });
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
