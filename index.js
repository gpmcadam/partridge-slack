const partridge = require('./partridge');
const restify = require('restify');
const server = restify.createServer();

const response = (req, res, next) => {
    partridge(req.params.text)
        .then(result => {
            res.send({
                response_type: "in_channel",
                text: result.gif
            });
        });
}

server.get('/', response);

server.listen(process.env.PORT || 8080);
