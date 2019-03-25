const {parentPort} = require('worker_threads');
const bus = Java.type("interop.SimpleInteropBus").global;

while (true) {
    parentPort.postMessage(bus.pendingQueue.take());
}

