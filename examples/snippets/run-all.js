const {spawn, execSync} = require('child_process');

function executeJs(name, readyCondition) {
    return execute("node", ["--jvm", "--experimental-worker", require.resolve(name)], readyCondition)
}

function killIfConnected(child, signal = 9) {
    return new Promise(resolve => {
        if (child.connected) {
            child.kill(signal);
        }
        child.once('exit', resolve);
    })
}

function pipeLines(from, to, transform = a => a) {
    from.on('data', data => data
        .toString()
        .split('\n')
        .filter(line => line.trim().length > 0)
        .forEach(line => to.write(transform(line))));
}

function wroteToStdout(substring) {
    return child => new Promise(resolve => 
        child.stdout.on('data', data => (data.includes(substring)) ? resolve() : null))
}

function execute(command, args, readyCondition) {
    return new Promise(resolve => {
        console.log(`====================== ${command} ${args.join(' ')} ===================`);
        const child = spawn(command, args, {stdio: ['pipe', 'pipe', 'pipe', 'ipc']});
        pipeLines(child.stdout, process.stdout, line => '\x1b[32m' + line + '\x1b[0m\n');
        pipeLines(child.stderr, process.stderr, line => '\x1b[33m' + line + '\x1b[0m\n');
        if (readyCondition) {
            readyCondition(child).then(() => resolve(() => killIfConnected(child)));
        }
        child.once('exit', () => resolve(() => {
            throw new Error("Process already stopped.")
        }));
    });
}

function resolveAfter(millis) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), millis)
    })
}

async function publishMessage(msg) {
    await execute('rabbitmqadmin', ['-u', 'rabbitmq', '-p', 'rabbitmq', 'publish', 'routing_key=hello-rabbit', `payload=${msg}`]);
}

const handlerRegistered = wroteToStdout("Message handler [");

async function runAll() {
    await executeJs("./hello-world.js");
    await executeJs("./bcrypt.js");
    await executeJs("./callback.js");
    await executeJs("./async.js");

    const killRabbitmqJava = await execute("mvn", ["compile", "exec:java", '-Dexec.mainClass=mq.JavaConsumerExample'], handlerRegistered);
    publishMessage("Hello Java!");
    await resolveAfter(1000);
    await killRabbitmqJava();

    const killRabbitmqTake = await executeJs("./rabbitmq.js", handlerRegistered);
    publishMessage("Hello node!");
    await resolveAfter(1000);
    await killRabbitmqTake();

    const killRabbitmqTake2 = await executeJs("./rabbitmq-take-2.js", handlerRegistered);
    publishMessage("Hello node!");
    await resolveAfter(1000);
    await killRabbitmqTake2();
}

runAll();
