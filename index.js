const partridge = require('./partridge');
const restify = require('restify');
const server = restify.createServer();

const response = (req, res, next) => {
    partridge(req.params.text)
        .then(result => {
            res.send({
                text: result.gif
            });
        });
}

server.post('/', response);
server.get('/', response);

server.listen(process.env.PORT || 8080);
