var React = require('react');

module.exports = React.createClass({
    render: function() {
        var elements = this.props.selected.activities.map(function(activity) {
            return React.DOM.tr({ key: activity.id }, [
                React.DOM.td({ key: activity.id + '-name'}, activity.name),
                React.DOM.td({ key: activity.id + '-kgs'}, activity.kgs),
                React.DOM.td({ key: activity.id + '-sets'}, activity.sets),
                React.DOM.td({ key: activity.id + '-reps'}, activity.reps)
            ]);
        });
        elements.unshift(
            React.DOM.tr({ key: 'summary-header-row' }, [
                React.DOM.th({ key: 'summary-header-name' }, 'Øvelse'),
                React.DOM.th({ key: 'summary-header-kgs' }, 'Kg'),
                React.DOM.th({ key: 'summary-header-sets' }, 'Sets'),
                React.DOM.th({ key: 'summary-header-reps' }, 'Reps'),
            ])
        );
        return React.DOM.div(null, [
            React.DOM.h2({ key: 'headertext' }, this.props.selected.date.toLocaleDateString()),
            React.DOM.table({ key: 'activitytable' },
                React.DOM.tbody(null, elements))
        ]);
    }
});
