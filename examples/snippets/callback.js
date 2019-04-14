const Arrays = Java.type("java.util.Arrays");

const javaList = Arrays.asList(1, 2);

javaList.stream()
    .map(v => `In node: ${v}`)
    .forEach(console.log);
