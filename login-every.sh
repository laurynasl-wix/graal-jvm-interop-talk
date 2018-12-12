#!/usr/bin/env bash

while :
do
  curl -XPOST -s http://localhost:3000/login?password=foo > /dev/null
  sleep $1
done
