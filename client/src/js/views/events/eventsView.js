var React = require('react');
var moment = require('moment');

var DatePicker = require('./datePicker');
var EventView = require('./eventView');
var Event = require('../../models/event');

var EventsView = React.createClass({
    getInitialState: function() {
        return { selectedDate: moment().startOf('day') }
    },
    changeSelectedDate: function(date) {
        this.setState({ selectedDate: date });
    },
    render: function() {
        var datePicker = DatePicker({
            key: 'datepicker',
            selectedDate: this.state.selectedDate,
            changeSelectedDate: this.changeSelectedDate,
            eventDates: this.props.events.pluck('date')
        });
        var selectedDate = this.state.selectedDate;
        var selectedEvent = this.props.events.find(function(e) {
            return e.get('date').isSame(selectedDate);
        });
        if (!selectedEvent) {
            selectedEvent = new Event();
            selectedEvent.set('date', selectedDate);
        }
        var eventView = EventView({
            key: 'eventview',
            event: selectedEvent,
            activities: this.props.activities
        });
        return React.DOM.div(
            null,
            [datePicker, eventView])
    }
});

module.exports = EventsView;
