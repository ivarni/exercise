var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

    defaults: {
        'name': '',
        'kgs': 0,
        'reps': 0,
        'sets': 0
    },

    //TOOD: figure out how to properly map '_id' to 'id'
    idAttribute: '_id',

    parse: function(response, options) {
        return {
            id: response._id,
            name: response.name,
            kgs: response.kgs,
            reps: response.reps,
            sets: response.sets
        }
    }

})
