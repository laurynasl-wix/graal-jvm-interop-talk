require('../../ensure-classpath');
const BCrypt = Java.type("org.mindrot.jbcrypt.BCrypt");

const salt = "$2a$10$sfMWTWROyUu5JxTEwm413u";

const hash = BCrypt.hashpw("Hello", salt);

console.log(hash);
