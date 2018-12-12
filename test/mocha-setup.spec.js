let chai = require('chai');

global.expect = chai.expect;

after(() => {
    setTimeout(() => {
        require("../lib/interop").terminate()
    }, 500);
});

