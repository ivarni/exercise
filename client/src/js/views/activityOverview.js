var React = require('react');
var moment = require('moment');

var ActivityInput = require('./activityInput');
var ActivitySummary = require('./activitySummary');
var CreateActivity = require('./createActivity');
var DatePicker = require('./datePicker');
var Event = require('../models/event');

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
                key: 'DatePicker',
                changeSelectedDate: this.changeSelectedDate,
                selectedDate: this.state.selected ? this.state.selected.get('date') :null,
            }),
            CreateActivity({
                key: 'CreateActivity',
                saveNewActivity: this.saveNewActivityType
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
            return moment(c.get('date')).isSame(newDate);
        });
        console.log(newSelected)
        this.setState({ selected: newSelected })
    },
    saveNewActivityType: function(name) {
        selectData.name.push(name);
        //TOOD: Figure out how to fore render the right way
        this.setState(this.getInitialState());
    },
    saveNewActivity: function(activity) {
        var selected = this.state.selected;
        if (selected) {
            selected.get('activities').push(activity);
        } else {
            var newEvent = new Event({
                date: new Date(),
                activities: []
            });
            //hacky, because should go via server anyway
            newEvent.get('date').setHours(0);
            newEvent.get('date').setMinutes(0);
            newEvent.get('date').setSeconds(0);
            newEvent.get('date').setMilliseconds(0);

            selected = this.state.selected = newEvent;
            newEvent.get('activities').push(activity);
            this.props.events.add(newEvent);
        }
        selected.get('activities')[this.state.selected.get('activities').length - 1].id = "1-" + this.state.selected.get('activities').length;
        this.setState({ selected: selected });
    }
});
