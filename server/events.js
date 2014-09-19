var q = require('q');
var moment = require('moment');
var mongoose = require('mongoose');

var mockData = [];

var Event;
var Activity;

var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {

    var activitySchema = new mongoose.Schema({

    });
    Activity = mongoose.model('Activity', activitySchema);

    var eventSchema = new mongoose.Schema({
        date: { type: 'Date' },
        activities: { type: Activity, ref: activitySchema }
    });
    Event = mongoose.model('Event', eventSchema);

});
mongoose.connect('mongodb://localhost/exercise');

module.exports = {

    get: function() {
        var deferred = q.defer();
        deferred.resolve(mockData);

        Event.find().populate('activities').run(function(err, events) { //or .exec
            if (err) return console.log(err);
            console.dir(events);
        });

        return deferred.promise;
    },

    add: function(data) {
        var deferred = q.defer();
        //data = JSON.parse(data);
        data.date = moment(data.date).startOf('day');
        mockData.push(data);
        deferred.resolve(data);

        var newEvent = new Event({
            date: data.date
        });
        newEvent.save(function(err, newEvent) {
            if (err) console.log(err);
            console.dir(newEvent);
        });

        return deferred.promise;
    }

}
