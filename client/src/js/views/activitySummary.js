var React = require('react');

var fields = require('../config/fields');

module.exports = React.createClass({
    render: function() {
        if (!this.props.selected) {
            return null;
        }
        var elements = this.props.selected.get('activities').map(function(activity) {
            return React.DOM.tr({ key: activity.id },
                fields.map(function(field) {
                    return React.DOM.td({ key: activity.id + '-' + field.name}, activity[field.name]);
                })
            );
        });
        elements.unshift(
            React.DOM.tr({ key: 'summary-header-row' },
                fields.map(function(field) {
                    return React.DOM.th({ key: 'summary-header-' + field.name}, field.name)
                })
            )
        );
        return React.DOM.div(null, [
            React.DOM.h2({ key: 'headertext' }, this.props.selected.get('date').toLocaleDateString()),
            React.DOM.table({ key: 'activitytable' },
                React.DOM.tbody(null, elements))
        ]);
    }
});
