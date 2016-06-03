const partridge = require('./partridge');
const restify = require('restify');
const server = restify.createServer();

server.get('/:str', (req, res, next) => {
    partridge('protest')
        .then(result => {
            res.send(result);
        });
});

server.listen(process.env.PORT || 8080);
