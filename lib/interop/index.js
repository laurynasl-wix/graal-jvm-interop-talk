require('../../ensure-classpath');

const NodeBoundAsyncCallback = Java.type("interop.NodeBoundAsyncCallback");

exports.bindCallback = (cb) => {
    return NodeBoundAsyncCallback.bindCallback(cb);
};
