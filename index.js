var app = (require('express'))(), 
    apiRouter = require('./apiRouter');

(require('node-env-file'))(__dirname + '/.env');

app.use('/api/' + process.env.VERSION, apiRouter);

app.listen(process.env.PORT, function () {
    console.log('Started listening at port ' + 
                process.env.PORT);
});