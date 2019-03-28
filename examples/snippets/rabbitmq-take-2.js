const MessageQueue = Java.type("examples.rabbitmq.MessageQueue");
const mq = new MessageQueue();

const handleMessage = message => console.log(message);

const {bindCallback} = require("../../lib/interop");
const JSHandler = Java.type("examples.rabbitmq.JSHandler");

mq.init();
mq.addHandler("hello-rabbit", new JSHandler(bindCallback(handleMessage)));
