package examples;

import com.rabbitmq.client.*;

public class RabbitMQJava {

    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();

        factory.setUsername("rabbitmq");
        factory.setPassword("rabbitmq");
        factory.setHost("localhost");
        factory.setPort(5672);

        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        String queueName = "hello-rabbit";

        channel.queueDeclare(queueName, false, false, false, null);

        DeliverCallback deliverCallback = (consumerTag, message) -> 
                System.out.println("Received message: " + new String(message.getBody()));

        CancelCallback cancelCallback = consumerTag -> 
                System.out.println("Received cancellation.");
        
        channel.basicConsume(queueName, true, deliverCallback, cancelCallback);
        System.out.println("Listening for messages on " + queueName);
    }
}
