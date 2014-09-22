var q = require('q');
var mongoose = require('mongoose');
var db = require('./db');

var ActivityType;

db.connection().then(function() {
    var activityTypeSchema = new mongoose.Schema({
        name: { type: 'String' }
    });
    ActivityType = mongoose.model('ActivityType', activityTypeSchema);
});

module.exports = {

    get: function() {
        var deferred = q.defer();

        ActivityType.find().exec(function(err, activities) {
            if (err) console.log(err);
            deferred.resolve(activities);
        });

        return deferred.promise;
    },

    add: function(data) {
        var deferred = q.defer();

        var newActivityType = new ActivityType({
            name: data.name
        });

        newActivityType.save(function(err, newActivityType) {
            if (err) console.log(err);
            console.dir(newActivityType);
        });
        deferred.resolve(data);

        return deferred.promise;
    }

}
