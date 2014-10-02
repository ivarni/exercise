var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Activity = require('./activity');

module.exports = Backbone.Collection.extend({

    url: 'activities',

    model: Activity,

    initialize: function(models, options) {
        models && models.forEach(function(model) {
            this.add(new Activity(model));
        }, this);
    }

});
