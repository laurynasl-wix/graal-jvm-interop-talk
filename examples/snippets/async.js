require('../../ensure-classpath');
const {bindCallback} = require('../../lib/interop');
const SomethingAsync = Java.type("examples.Async");

const bound = bindCallback((error, result) => {
    console.log(`node.js: ${result}`);
    bound.unbind();
});

SomethingAsync.callMeBack(bound);
console.log("Let's wait now");
