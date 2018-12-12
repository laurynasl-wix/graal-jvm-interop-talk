const {app} = require('./app');
const port = 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));

process.on('SIGINT', function() {
    process.exit(0);
});
