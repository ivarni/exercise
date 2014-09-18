var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

    parse: function(response, options) {
        return {
            date: new Date(response.date),
            activities: response.activities
        };
    }

})
