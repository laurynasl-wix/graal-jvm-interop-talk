const ConnectionFactory = Java.type("com.rabbitmq.client.ConnectionFactory");
const JString = Java.type("java.lang.String");
const ExtendDeliverCallback = Java.extend(Java.type("com.rabbitmq.client.DeliverCallback"));
const ExtendCancelCallback = Java.extend(Java.type("com.rabbitmq.client.CancelCallback"));

const factory = new ConnectionFactory();

factory.setUsername("rabbitmq");
factory.setPassword("rabbitmq");
factory.setHost("localhost");
factory.setPort(5672);

const connection = factory.newConnection();
const channel = connection.createChannel();

const queueName = "hello-rabbit";

channel.queueDeclare(queueName, false, false, false, null);

const deliverCallback = new ExtendDeliverCallback((consumerTag, message) =>
    console.log("Received message: " + new JString(message.getBody())));

const cancelCallback = new ExtendCancelCallback(consumerTag =>
    console.log("Received cancellation."));

channel.basicConsume(queueName, true, deliverCallback, cancelCallback);
console.log("Listening for messages on " + queueName);

(function wait() {
    setTimeout(wait, 1000);
})();

process.on('SIGINT', function() {
    process.exit(0);
});
