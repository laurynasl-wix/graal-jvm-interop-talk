const RabbitMQ = Java.type("examples.rabbitmq.RabbitMQ");
const mq = new RabbitMQ();
const JSHandler = Java.type("examples.rabbitmq.JSHandler");
const {bindCallback} = require("../../lib/interop");

const handleMessage = new JSHandler(bindCallback(console.log));

mq.init();
mq.addConsumer("hello-rabbit", handleMessage);
