var apiRouter = (require('express')).Router(), 
    bodyParser = require('body-parser');

apiRouter.use(bodyParser.json());

apiRouter.post('/login', function (req, res) {
    
});