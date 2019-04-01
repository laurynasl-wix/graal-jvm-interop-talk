const {bindCallback} = require('../../lib/interop');
const SomethingAsync = Java.type("examples.Async");

const bound = bindCallback(result => {
    console.log(`node.js: ${result}`);
    return new Promise((resolve) => {
        setTimeout(() => resolve("Hey!"), 100);
    })
});

SomethingAsync.callMeBack(bound);
console.log("Let's wait now");