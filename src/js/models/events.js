var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Event = require('./event');

module.exports = Backbone.Collection.extend({

    url: 'events',

    model: Event

})
