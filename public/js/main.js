window.APP = window.APP || {};
(function(APP) {

    var mockData = [
        {
            date: new Date(2014, 8, 14),
            activities: [
                { name: 'Markløft', kgs: 70, sets: 4, reps: 8 },
                { name: 'Knebøy', kgs: 60, sets: 3, reps: 8 }
            ]
        }, {
            date: new Date(2014, 8, 11),
            activities: [
                { name: 'Brystpress', kgs: 22, sets: 3, reps: 8 },
                { name: 'Bicepscurl', kgs: 12, sets: 3, reps: 10 }
            ]
        },
    ];

    var ActivityOverview = React.createClass({
        getInitialState: function() {
            return { selected : mockData[0] };
        },
        render: function() {
            var dates = mockData.map(function(activity) {
                return activity.date;
            });
            return React.DOM.div(null, [
                        DateSelector({
                            dates: dates,
                            selectedDate: this.state.selected.date,
                            changeSelectedDate: this.changeSelectedDate
                        }),
                        ActivitySummary({
                            selected: this.state.selected
                        })
                    ]);
        },
        changeSelectedDate: function(newDate) {
            var newSelected = mockData.find(function(c) {
                return c.date === newDate;
            });
            this.setState({ selected: newSelected })
        }
    });

    var DateSelector = React.createClass({
        render: function() {
            var props = this.props;
            var elements = props.dates.map(function(element) {
                return React.DOM.li(null,
                    React.DOM.a({
                        href: '#' ,
                        className: props.selectedDate === element ? 'selected': '',
                        onClick: function() {
                            props.changeSelectedDate(element);
                        }
                    }, element.toLocaleDateString())
                );
            });
            return React.DOM.ul(null, elements);
        }
    });

    var ActivitySummary = React.createClass({
        render: function() {
            var elements = this.props.selected.activities.map(function(activity) {
                return React.DOM.tr(null, [
                    React.DOM.td(null, activity.name),
                    React.DOM.td(null, activity.kgs),
                    React.DOM.td(null, activity.sets),
                    React.DOM.td(null, activity.reps)
                ]);
            });
            elements.unshift(
                React.DOM.tr(null, [
                    React.DOM.th(null, 'Øvelse'),
                    React.DOM.th(null, 'Kg'),
                    React.DOM.th(null, 'Sets'),
                    React.DOM.th(null, 'Reps'),
                ])
            );
            return React.DOM.div(null, [
                React.DOM.h2(null, this.props.selected.date.toLocaleDateString()),
                React.DOM.table(null, elements)
            ]);
        }
    });

    React.renderComponent(
        ActivityOverview(),
        document.getElementById('container')
    );


}(window.APP))
