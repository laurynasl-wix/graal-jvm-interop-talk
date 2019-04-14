const {parentPort} = require('worker_threads');
const bus = Java.type("interop.SimpleInteropBus").global;
const MILLISECONDS = Java.type("java.util.concurrent.TimeUnit").MILLISECONDS;

let stopping = false;

parentPort.on("message", data => {
    if (data === "STOP") {
        stopping = true;
    }
});

function loop() {
    const thunk = bus.pendingQueue.poll(100, MILLISECONDS);
    if (thunk) {
        parentPort.postMessage(thunk);
    }
    if (!stopping) {
        setImmediate(loop);
    } else {
        process.exit(0);
    }
}

loop();