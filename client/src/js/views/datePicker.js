var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
    render: function() {
        var now = moment();
        var previous = moment().month(now.month() - 1);
        var next = moment().month(now.month() + 1);

        var monthBefore = makeDayArray(
            previous.endOf('month').date() - (now.date(1).day() - 2),
            previous.endOf('month').date(),
            previous.year(),
            previous.month()
        );
        var nextMonth = makeDayArray(
            1,
            7 - now.endOf('month').day(),
            next.year(),
            next.month()
        );
        thisMonth = monthBefore.
            concat(makeDayArray(1, now.endOf('month').date(), now.year(), now.month())).
            concat(nextMonth);

        var elements = thisMonth.map(function(day, i) {
            return React.DOM.div({
                    key: i,
                    className: getClassNames(day, now)
                }, day.date());
        });
        return React.DOM.div({
            className: 'dates'
        }, elements)
    }
});

function getClassNames(day, now) {
    return [
        day.day() % 7 === 1 ? 'week-start': '',
        day.month() !== now.month() ? 'disabled': ''
    ].join(' ');
}

function makeDayArray(start, stop, year, month) {
    var a = [];
    for (var i = start; i <= stop; i++) {
        a.push(moment({
                year: year,
                month: month,
                day: i
            }));
    }
    return a;
}
