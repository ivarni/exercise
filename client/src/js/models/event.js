var moment = require('moment');
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Activities = require('./activities');

module.exports = Backbone.Model.extend({

    url: 'event',

    defaults: {
        'activities': new Activities()
    },

    parse: function(response, options) {
        return {
            date: moment(response.date),
            activities: new Activities(response.activities),
            id: response._id
        };
    }

})
