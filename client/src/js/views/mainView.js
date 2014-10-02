var React = require('react');

var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var EventsView = require('./events/eventsView');

var MainView = React.createClass({
    componentDidMount: function() {
        var Router = Backbone.Router.extend({
            routes: {
                '': 'showEvents'
            },
            showEvents: this.setState.bind(this, { show: 'events' })
        });
        new Router();
        Backbone.history.start();
        //TOOD: Avoid superfluous renderings
        this.props.events.fetch();
        this.props.events.on('add remove change', this.forceUpdate.bind(this, null));
        this.props.activities.fetch();
        this.props.activities.on('add remove change', this.forceUpdate.bind(this, null));
    },
    getInitialState: function() {
        return { show: null };
    },
    render: function() {
        if ('events' === this.state.show) {
            return EventsView({
                events: this.props.events,
                activities: this.props.activities
            });
        }
        return React.DOM.div();
    }
});

module.exports = MainView;
