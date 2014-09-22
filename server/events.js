var q = require('q');
var moment = require('moment');
var mongoose = require('mongoose');
var db = require('./db');

var Event;
var Activity;

db.connection().then(function() {
    var activitySchema = new mongoose.Schema({
        name: { type: 'String' },
        kgs: { type: 'String' },
        reps: { type: 'String' },
        sets: { type: 'String' },
    });
    Activity = mongoose.model('Activity', activitySchema);

    var eventSchema = new mongoose.Schema({
        date: { type: 'Date' },
        activities: [activitySchema]
    });
    Event = mongoose.model('Event', eventSchema);
});

module.exports = {

    get: function() {
        var deferred = q.defer();

        Event.find().populate('activities').exec(function(err, events) {
            if (err) return console.log(err);
            deferred.resolve(events);
        });

        return deferred.promise;
    },

    add: function(data) {
        var deferred = q.defer();
        data.date = moment(data.date).startOf('day');

        var newEvent = new Event({
            date: data.date,
            activities: []
        });
        data.activities.forEach(function(activity) {
            newEvent.activities.push(new Activity({
                name: activity.name,
                kgs: activity.kgs,
                reps: activity.reps,
                sets: activity.sets
            }))
        })

        newEvent.save(function(err, newEvent) {
            if (err) console.log(err);
            console.dir(newEvent);
        });
        deferred.resolve(data);

        return deferred.promise;
    }

}
