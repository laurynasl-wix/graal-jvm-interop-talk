const MessageQueue = Java.type("examples.rabbitmq.MessageQueue");
const mq = new MessageQueue();

const handleMessage = message => console.log(message);




mq.init();
mq.addHandler("hello-rabbit", handleMessage);











(function wait() {
    setTimeout(wait, 1000);
})();

process.on('SIGINT', function() {
    process.exit(0);
});
