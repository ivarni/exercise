var React = require('react');
var _ = require('lodash');

var AddActivity = require('./addActivity');

var TableHeader = React.createClass({
    render: function() {
        var cells = this.props.names.map(function(name) {
            return React.DOM.th({
                key: 'tableheader_' + name
            }, name);
        });
        var row = React.DOM.tr(
            null,
            cells
        );
        return React.DOM.thead(
            null,
            row
        );
    }
});

var TableRow = React.createClass({
    render: function() {
        var self = this;
        var cells = _.without(this.props.activity.keys(), '_id').map(function(key, i) {
            return React.DOM.td({
                key: i
            }, self.props.activity.get(key));
        });
        return React.DOM.tr({
            key: this.props.index
        }, cells);
    }
});

var TableRows = React.createClass({
    render: function() {
        var rows = this.props.activities.map(function(activity, i) {
            return TableRow({
                key: activity.id,
                activity: activity,
                index: i
            })
        });
        return React.DOM.tbody(
            null,
            rows
        );
    }
});

var Table = React.createClass({
    render: function() {
        var activities = this.props.event.get('activities');
        if (activities.length === 0) {
            return React.DOM.p(null, 'empty');
        }

        var header = TableHeader({
            key: 'tableheader',
            names: _.without(activities.at(0).keys(), '_id')
        });
        var rows = TableRows({
            key: 'tablerows',
            activities: this.props.event.get('activities')
        });
        return React.DOM.table(
            null,
            [header, rows]
        );
    }
});

var EventView = React.createClass({
    addActivity: function(activity) {
        this.props.event.get('activities').add(activity);
        console.log(this.props.event);
        try {
        this.props.event.save();
        } catch(e) {
            console.log(e);
        }
    },
    render: function() {
        var table = Table({
            key: 'eventtable',
            event: this.props.event
        });
        var addView = AddActivity({
            key: 'addactivity',
            activities: this.props.activities,
            addActivity: this.addActivity
        });
        return React.DOM.div(
            null,
            [table, addView]
        );
    }
});

module.exports = EventView;
