const {fork, execSync} = require('child_process');


function execute(name) {
    return new Promise(resolve => {
        console.log(`====================== ${name} ===================`);
        const child = fork(require.resolve(name), [], {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
        child.stdout.on('data', (data) => process.stdout.write(`> ${data}`));
        child.stderr.on('data', (data) => process.stderr.write(`> ${data}`));
        child.on('exit', () => resolve());
        setTimeout(() => {
            if (child.connected) {
                child.kill(9);
            }
            resolve()
        }, 10000)
    })
}

function waitFor(millis) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), millis)
    })
}

function publishMessage() {
    execSync("rabbitmqadmin -u rabbitmq -p rabbitmq publish routing_key=hello-rabbit payload='Hello node!'", {stdio: 'inherit'})
}

async function runAll() {
    await execute("./hello-world.js");
    await execute("./bcrypt.js");
    await execute("./callback.js");
    
    const rabbitmq = execute("./rabbitmq.js");
    await waitFor(5000);
    publishMessage();
    await rabbitmq;
    
    const rabbitmqTake2 = execute("./rabbitmq-take-2.js");
    await waitFor(5000);
    publishMessage();
    await rabbitmqTake2;
}

runAll();
