var restify = require('restify');

function log(req, res, next) {
    console.log('%s: %s', req.method, req.path());
    res.on('finish', function() {
        console.log('%s: %s', res.statusCode, res._body);
    });
    next();
}

function getEvents(req, res, next) {
    res.send('test');
    next();
}

var server = restify.createServer();

server.get('events', log, getEvents);
server.get(/.*/, restify.serveStatic({
  directory: './public'
}));


server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
