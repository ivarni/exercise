var React = require('react');

var ActivityInput = require('./activityInput');
var DateSelector = require('./dateSelector')
var ActivitySummary = require('./activitySummary')

var mockData = [
    {
        id: '1',
        date: new Date(2014, 8, 14),
        activities: [
            { id: '1-1', name: 'Markløft', kgs: 70, sets: 4, reps: 8 },
            { id: '1-2', name: 'Knebøy', kgs: 60, sets: 3, reps: 8 }
        ]
    }, {
        id: '2',
        date: new Date(2014, 8, 11),
        activities: [
            { id: '2-1', name: 'Brystpress', kgs: 22, sets: 3, reps: 8 },
            { id: '2-2', name: 'Bicepscurl', kgs: 12, sets: 3, reps: 10 }
        ]
    },
];

module.exports = React.createClass({
    getInitialState: function() {
        return {
            selected : mockData[0]
        };
    },
    render: function() {
        var dates = mockData.map(function(activity) {
            return activity.date;
        });
        return React.DOM.div(null, [
            DateSelector({
                key: 'DateSelector',
                dates: dates,
                selectedDate: this.state.selected.date,
                changeSelectedDate: this.changeSelectedDate
            }),
            ActivitySummary({
                key: 'ActivitySummary',
                selected: this.state.selected
            }),
            ActivityInput({
                key: 'ActivityInput',
                saveNewActivity: this.saveNewActivity
            })
        ]);
    },
    changeSelectedDate: function(newDate) {
        var newSelected = mockData.find(function(c) {
            return c.date === newDate;
        });
        this.setState({ selected: newSelected })
    },
    saveNewActivity: function(activity) {
        this.state.selected.activities.push(activity);
        this.state.selected.activities[this.state.selected.activities.length - 1].id = "1-" + this.state.selected.activities.length;
        this.setState({ selected: this.state.selected });
    }
});
