const RabbitMQ = Java.type("mq.RabbitMQ");
const mq = new RabbitMQ();
mq.init();



const handle = console.log;


mq.addConsumer("hello-rabbit", handle);











(function wait() {
    setTimeout(wait, 1000);
})();

process.on('SIGINT', function() {
    process.exit(0);
});
