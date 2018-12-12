const express = require('express');
const BCrypt = Java.type("org.mindrot.jbcrypt.BCrypt");

const salt = "$2a$10$sfMWTWROyUu5JxTEwm413u";

const app = express();

app.post('/login', (req, res) => {
    const pass = req.query.password;
    res.send(BCrypt.hashpw(pass, salt));
});

app.get('/', (req, res) => {
    res.send("Welcome!")
});

module.exports = {
    app
};
