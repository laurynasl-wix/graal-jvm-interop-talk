const fetch = require('node-fetch');

const {app} = require('./app');
const port = 3001;
const baseUrl = `http://localhost:${port}`;

describe('server', function () {
    this.timeout(5000);
    let server;

    before(done => app.listen(port, (err, serverInstance) => {
        server = serverInstance;
        done(err)
    }));

    after(done => {
        if (server) {
            server.stop(done)
        } else {
            done()
        }
    });

    it('should respond to login with hash', async () => {
        const hashed = '$2a$10$sfMWTWROyUu5JxTEwm413uLNddg2ctHH6QPKsLCugoQ3u/Mjb/CYi';
        const password = 'Hello';

        const response = await fetch(`${baseUrl}/login?password=${password}`, {method: 'POST'});

        expect(response.status).to.be.equal(200);

        expect(await response.text()).to.be.equal(hashed);
    });

    it('should respond to / with "Welcome"', async () => {
        const response = await fetch(`${baseUrl}/`);

        expect(response.status).to.be.equal(200);

        expect(await response.text()).to.be.equal("Welcome!");
    });

});
