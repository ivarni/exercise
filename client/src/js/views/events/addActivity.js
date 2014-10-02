var React = require('react');

var Activity = require('../../models/activity');
var NameInput = require('./add/nameInput');
var Input = require('./add/input');

var AddActivity = React.createClass({
    getInitialState: function() {
        return { activity: new Activity() }
    },
    setName: function(index) {
        var name = this.props.activities.at(index - 1).get('name');
        this.state.activity.set('name', name);
        this.setState({ activity: this.state.activity });
    },
    setValue: function(key, value) {
        this.state.activity.set(key, value);
        this.setState({ activity: this.state.activity });
    },
    save: function() {
        this.props.addActivity(this.state.activity);
        return false;
    },
    render: function() {
        var submitButton = React.DOM.button({
            key: 'submit',
            onClick: this.save
        }, 'Save');
        return React.DOM.form(
            null,
            [
                NameInput({
                    key: 'nameinput',
                    activities: this.props.activities,
                    setName: this.setName
                }),
                Input({
                    key: 'kgsinput',
                    field: 'kgs',
                    setValue: this.setValue
                }),
                Input({
                    key: 'repsinput',
                    field: 'reps',
                    setValue: this.setValue
                }),
                Input({
                    key: 'setsinput',
                    field: 'sets',
                    setValue: this.setValue
                }),
                submitButton
            ]
        );
    }
});

module.exports = AddActivity;
