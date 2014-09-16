var q = require('q');


var mockData = [
    {
        id: '1',
        date: new Date(2014, 8, 14),
        activities: [
            { id: '1-1', name: 'Markløft', kgs: 70, sets: 4, reps: 8 },
            { id: '1-2', name: 'Knebøy', kgs: 60, sets: 3, reps: 8 }
        ]
    }, {
        id: '2',
        date: new Date(2014, 8, 11),
        activities: [
            { id: '2-1', name: 'Brystpress', kgs: 22, sets: 3, reps: 8 },
            { id: '2-2', name: 'Bicepscurl', kgs: 12, sets: 3, reps: 10 }
        ]
    },
];


module.exports = {

    get: function() {
        var deferred = q.defer();
        deferred.resolve(mockData);
        return deferred.promise;
    }

}
