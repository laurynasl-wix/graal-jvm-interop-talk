## Using JVM libraries in node.js

This repository contains the companion code to the [presentation](https://speakerdeck.com/laurynaslwix/using-jvm-libraries-in-node-dot-js). 
### Setup

1. Install [GraalVM 1.0.0-RC10](https://github.com/oracle/graal/releases/tag/vm-1.0.0-rc10) 
2. Make sure that the `node` and `npm` binaries distributed with GraalVM is on the `$PATH`
3. Make sure you have [docker-compose](https://docs.docker.com/compose/install/) installed
4. run `docker-compose up -d`
5. Make sure you have [maven](https://maven.apache.org/install.html) installed
6. run `npm install && npm run build`
### Contents:

##### [./examples/bcrypt/app.js](./examples/bcrypt/app.js)

This the example that is using [jbcrypt](https://www.mindrot.org/projects/jBCrypt/) to hash the password.
You can start the server with `npm --jvm run start:bcrypt`

##### [./examples/snippets/rabbitmq.js](./examples/snippets/rabbitmq.js)

The naive implementation of rabbitmq consumer. Start it with
`npm --jvm run start:rabbitmq`. The easiest way to publish a message is to 
follow this [link](http://localhost:15672/#/queues/%2F/hello-rabbit)
after you started the example.

##### [./examples/snippets/rabbitmq-take-2.js](./examples/snippets/rabbitmq-take-2.js)

The naive implementation of rabbitmq consumer. Start it with
`npm --jvm run start:rabbitmq-take-2`.

##### Async interop implementation

The java part is [here](./src/main/java/interop) and the js part is [here](./lib/interop). 
See slides for further details
