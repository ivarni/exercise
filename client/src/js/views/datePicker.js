var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
    makeDayArray: function(start, stop, year, month) {
        var a = [];
        for (var i = start; i <= stop; i++) {
            a.push(moment({
                    year: year,
                    month: month,
                    day: i
                }));
        }
        return a;
    },
    handleClick: function(day) {
        this.props.changeSelectedDate(day)
    },
    getClassNames: function(day, now) {
        return [
            'day',
            day.day() % 7 === 1 ? 'week-start': '',
            day.month() !== now.month() ? 'disabled': '',
            day.isSame(moment(this.props.selectedDate)) ? 'selected' : ''
        ].join(' ');
    },
    render: function() {
        var now = moment();
        var previous = moment().month(now.month() - 1);
        var next = moment().month(now.month() + 1);

        var monthBefore = this.makeDayArray(
            previous.endOf('month').date() - (now.date(1).day() - 2),
            previous.endOf('month').date(),
            previous.year(),
            previous.month()
        );
        var nextMonth = this.makeDayArray(
            1,
            7 - now.endOf('month').day(),
            next.year(),
            next.month()
        );
        this.thisMonth = monthBefore.
            concat(this.makeDayArray(1, now.endOf('month').date(), now.year(), now.month())).
            concat(nextMonth);

        var self = this;
        var elements = this.thisMonth.map(function(day, i) {
            return React.DOM.div({
                    key: i,
                    onClick: function() { self.handleClick(day) },
                    className: self.getClassNames(day, now)
                }, day.date());
        });
        var header = React.DOM.h3({
            className: 'header'
        }, this.props.selectedDate.toLocaleDateString());
        elements.unshift(header);
        return React.DOM.div({
            className: 'dates'
        }, elements)
    }
});

