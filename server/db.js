var q = require('q');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error);

var deferred = q.defer();

mongoose.connect('mongodb://localhost/exercise');
db.once('open', function() {
    deferred.resolve();
});

module.exports = {

    connection: function() {
        return deferred.promise;
    }

}
