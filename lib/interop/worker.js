const {parentPort} = require('worker_threads');
const bus = Java.type("interop.SimpleInteropBus").global;

while (true) {
    const jvmResult = bus.pendingQueue.take();
    bus.readyQueue.push(jvmResult);
    parentPort.postMessage("ready");
}

