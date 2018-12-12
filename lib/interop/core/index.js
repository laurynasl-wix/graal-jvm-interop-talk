const {toJavaException} = require('./java-extensions');

function executeThunk(thunk) {
    const {jsFunction, error, argument, callbackCompleted} = thunk;
    Promise.resolve()
        .then(() => jsFunction(error, argument))
        .then(
            result => callbackCompleted.complete(result),
            e => callbackCompleted.completeExceptionally(toJavaException(e))
        );
}

module.exports = {
    executeThunk
};
