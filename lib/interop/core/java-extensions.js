const JavaRuntimeException = Java.type("java.lang.RuntimeException");

function toJavaException(e) {
    return new JavaRuntimeException(`Error in JS callback ${e}`);
}

module.exports = {
    toJavaException
};
