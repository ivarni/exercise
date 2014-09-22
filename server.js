var restify = require('restify');

var events = require('./server/events');
var activities = require('./server/activities');

function log(req, res, next) {
    console.log('%s: %s', req.method, req.path());
    res.on('finish', function() {
        console.log('%s: %s', res.statusCode, res._body);
    });
    next();
}

function getEvents(req, res, next) {
    events.get().then(function(data) {
        res.send(data);
        next();
    });
}

function addEvent(req, res, next) {
    events.add(req.params).then(function(data) {
        res.send(data);
        next();
    })
}

function getActivities(req, res, next) {
    activities.get().then(function(data) {
        res.send(data);
        next();
    });
}

function addActivity(req, res, next) {
    activities.add(req.params).then(function(data) {
        res.send(data);
        next();
    })
}

var server = restify.createServer();
server.use(restify.bodyParser());

server.get('events', log, getEvents);
server.post('events', log, addEvent);

server.get('activities', log, getActivities);
server.post('activities', log, addActivity);

server.get(/.*/, restify.serveStatic({
  directory: './public'
}));


server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});
