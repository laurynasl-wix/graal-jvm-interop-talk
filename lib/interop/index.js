const bus = Java.type("interop.SimpleInteropBus").global;
const {Worker} = require('worker_threads');
const {executeThunk} = require('./core');

const worker = new Worker(require.resolve("./worker.js"));

worker.on("message", () => {
    let thunk;
    while (thunk = bus.readyQueue.poll()) {
        executeThunk(thunk);
    }
});

exports.bindCallback = bus.bindCallback;

/**
 * For the purposes of the talk, the implementation is simplified: we have to gracefully shutdown the 
 * application, which means tracking the bound promises, checking if there are any in flight messages 
 * and so on. In this case we just forcefully tell the worker thread to terminate. That means that code 
 * on the java side might wait forever for a promise to be resolved, the queues would get filled up and 
 * all hell would break loose.
 */
exports.terminate = () => {
    worker.terminate();
};
