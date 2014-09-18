var q = require('q');
var moment = require('moment')

var mockData = [];


module.exports = {

    get: function() {
        var deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
    },

    add: function(data) {
        var deferred = q.defer();
        //data = JSON.parse(data);
        data.date = moment(data.date).startOf('day');
        mockData.push(data);
        deferred.resolve(data);
        return deferred.promise;
    }

}
