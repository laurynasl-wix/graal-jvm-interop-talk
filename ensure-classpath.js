const {readFileSync} = require('fs');
const {resolve} = require('path');

const mavenDeps = readFileSync(require.resolve('./target/test-classpath')).toString();

let entries = mavenDeps.split(":").concat(resolve(__dirname, './target/classes'));
entries.forEach(entry => {
    Java.addToClasspath(entry);
});
