const RabbitMQ = Java.type("mq.RabbitMQ");
const mq = new RabbitMQ();
mq.init();
const JSHandler = Java.type("mq.JSHandler");
const {bindCallback} = require("../../interop");

const handle = 
    new JSHandler(bindCallback(console.log));

mq.addConsumer("hello-rabbit", handle);
