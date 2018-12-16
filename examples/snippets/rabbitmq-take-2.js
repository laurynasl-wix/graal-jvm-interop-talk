require('../../ensure-classpath');
const {bindCallback} = require("../../lib/interop");

const ConnectionFactory = Java.type("com.rabbitmq.client.ConnectionFactory");
const JString = Java.type("java.lang.String");
const JSDeliverCallback = Java.type("examples.JSDeliverCallback");
const NOOPCancelCallback = Java.type("examples.NOOPCancelCallback");

const factory = new ConnectionFactory();

factory.setUsername("rabbitmq");
factory.setPassword("rabbitmq");
factory.setHost("localhost");
factory.setPort(5672);

const connection = factory.newConnection();
const channel = connection.createChannel();

const queueName = "hello-rabbit";

channel.queueDeclare(queueName, false, false, false, null);

const deliverCallback = new JSDeliverCallback(bindCallback((error, message) =>
    console.log("Received message: " + new JString(message.getBody()))));

const cancelCallback = new NOOPCancelCallback();

channel.basicConsume(queueName, true, deliverCallback, cancelCallback);
console.log("Listening for messages on " + queueName);

(function wait() {
    setTimeout(wait, 1000);
})();

process.on('SIGINT', function() {
    process.exit(0);
});
