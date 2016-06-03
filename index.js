const partridge = require('./partridge');
const restify = require('restify');
const server = restify.createServer();

server.use(restify.queryParser());

const response = (req, res, next) => {
    partridge(req.query.text)
        .then(result => {
            res.send({
                response_type: "in_channel",
                text: result.gif
            });
        });
}

server.get('/', response);

server.listen(process.env.PORT || 8080);
