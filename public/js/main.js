window.APP = window.APP || {};
(function(APP) {

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

    var ActivityOverview = React.createClass({
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

    var ActivityInput = React.createClass({
        getInitialState: function() {
            return {
                name: '',
                kgs: '',
                sets: '',
                reps: ''
            };
        },
        render: function() {
            var fields = ['Name', 'Kgs', 'Sets', 'Reps'];
            fields = fields.map(function(field, i) {
                return React.DOM.div({ key: 'input-' + i}, [
                    React.DOM.label({
                        key: 'input-' + i + '-label',
                        htmlFor: field.toLowerCase()
                    }, field + ": "),
                    React.DOM.input({
                        key: 'input-' + i + '-field',
                        value: this.state[field.toLowerCase()],
                        name: field.toLowerCase(),
                        onChange: this.handleInputChange
                    })
                ]);
            }, this);
            fields.push(React.DOM.button({
                key: 'input-button',
                onClick: this.saveNewActivity
            }, 'Save'))
            return React.DOM.div(null, fields);
        },
        saveNewActivity: function() {
            this.props.saveNewActivity({
                name: this.state.name,
                kgs: this.state.kgs,
                sets: this.state.sets,
                reps: this.state.reps
            });
            this.setState({
                name: '',
                kgs: '',
                sets: '',
                reps: ''
            });
        },
        handleInputChange: function(event) {
            this.state[event.target.name] = event.target.value;
            this.setState(this.state)
        },
    });

    var DateSelector = React.createClass({
        render: function() {
            var props = this.props;
            var elements = props.dates.map(function(element, i) {
                return React.DOM.li({ key: 'dateselect-' + i },
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

    React.renderComponent(
        ActivityOverview(),
        document.getElementById('container')
    );


}(window.APP))
