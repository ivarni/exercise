var React = require('react');

var ActivityInput = require('./activityInput');
var DateSelector = require('./dateSelector');
var ActivitySummary = require('./activitySummary');
var CreateActivity = require('./createActivity');
var CreateEvent = require('./createEvent');
var DatePicker = require('./datePicker');

var selectData = require('../config/selectData');

var mockData = [];

module.exports = React.createClass({
    componentDidMount: function() {
        this.props.events.fetch();
        this.props.events.on('add remove change', this.forceUpdate.bind(this, null));
    },
    getInitialState: function() {
        return {
            selected: null
        };
    },
    render: function() {
        var dates = this.props.events.map(function(activity) {
            return activity.get('date');
        });
        return React.DOM.div(null, [
            DatePicker({
                key: 'DatePicker'
            }),
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
                selectedDate: this.state.selected ? this.state.selected.get('date') :null,
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
        var newSelected = this.props.events.find(function(c) {
            return c.get('date') === newDate;
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
        this.state.selected.get('activities').push(activity);
        this.state.selected.get('activities')[this.state.selected.get('activities').length - 1].id = "1-" + this.state.selected.get('activities').length;
        this.setState({ selected: this.state.selected });
    }
});
