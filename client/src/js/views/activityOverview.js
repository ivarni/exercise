var React = require('react');

var ActivityInput = require('./activityInput');
var DateSelector = require('./dateSelector');
var ActivitySummary = require('./activitySummary');
var CreateActivity = require('./createActivity');
var CreateEvent = require('./createEvent');

var selectData = require('../config/selectData');

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
    componentDidMount: function() {
        this.props.events.fetch();
    },
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
            CreateEvent({
                key: 'CreateEvent',
                saveNewEvent: this.saveNewEvent
            }),
            CreateActivity({
                key: 'CreateActivity',
                saveNewActivity: this.saveNewActivityType
            }),
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
    saveNewEvent: function() {
        mockData.push({
            id: '3',
            date: new Date(),
            activities: []
        });
        //TOOD: Figure out how to fore render the right way
        this.setState(this.getInitialState());
    },
    saveNewActivityType: function(name) {
        selectData.name.push(name);
        //TOOD: Figure out how to fore render the right way
        this.setState(this.getInitialState());
    },
    saveNewActivity: function(activity) {
        this.state.selected.activities.push(activity);
        this.state.selected.activities[this.state.selected.activities.length - 1].id = "1-" + this.state.selected.activities.length;
        this.setState({ selected: this.state.selected });
    }
});
