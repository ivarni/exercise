var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
    handleNextClick: function() {
        this.props.changeSelectedDate(moment(this.props.selectedDate).add(1, 'month'));
    },
    handlePrevClick: function() {
        this.props.changeSelectedDate(moment(this.props.selectedDate).add(-1, 'month'));
    },
    render: function() {
        var self = this;
        var header = React.DOM.h3({
            key: 'month-pick-header'
        }, this.props.selectedDate.format('MMMM YYYY'));

        var next = React.DOM.button({
                key: 'month-pick-next',
                onClick: function() { self.handleNextClick() },
                className: 'month-picker'
            }, 'Next');

        var prev = React.DOM.button({
                key: 'month-pick-prev',
                onClick: function() { self.handlePrevClick() },
                className: 'month-picker'
            }, 'Previous');

        return React.DOM.div({
                className: 'month-picker-row'
            }, [prev, header, next]);
    }
})
