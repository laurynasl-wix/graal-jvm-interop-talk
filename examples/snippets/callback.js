const List = Java.type("java.util.ArrayList");

const aList = new List();

aList.add(1);
aList.add(2);

aList.forEach(v => console.log(`In node: ${v}`));
