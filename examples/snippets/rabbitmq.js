const RabbitMQ = Java.type("examples.rabbitmq.RabbitMQ");
const mq = new RabbitMQ();



const handleMessage = console.log;

mq.init();
mq.addConsumer("hello-rabbit", handleMessage);











(function wait() {
    setTimeout(wait, 1000);
})();

process.on('SIGINT', function() {
    process.exit(0);
});
