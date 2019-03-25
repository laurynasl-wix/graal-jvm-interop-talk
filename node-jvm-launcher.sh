#!/usr/bin/env bash

DEP_CP=`cat target/test-classpath`

export CLASSPATH="target/classes:target/test-classes:$DEP_CP"

exec node --experimental-worker --vm.cp=$CLASSPATH "$@"
