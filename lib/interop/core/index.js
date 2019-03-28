const {toJavaException} = require('./java-extensions');

function executeThunk(thunk) {
    const {jsFunction, args, callbackCompleted} = thunk;
    Promise.resolve()
        .then(() => jsFunction(... Java.from(args)))
        .then(
            result => callbackCompleted.complete(result),
            e => {
                console.error(e);
                callbackCompleted.completeExceptionally(toJavaException(e))
            }
        );
}

module.exports = {
    executeThunk
};