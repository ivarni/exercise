var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

    initialize: function(attr) {
        this.set('date', new Date(attr.date));
    }

})
