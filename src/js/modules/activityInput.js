var React = require('react');

var fields = require('../config/fields')

module.exports = React.createClass({
    getInitialState: function() {
        var state = {};
        fields.forEach(function(field) {
            state[field] = '';
        });
        return state;
    },
    render: function() {
        var inputs = fields.map(function(field, i) {
            return React.DOM.div({ key: 'input-' + i}, [
                React.DOM.label({
                    key: 'input-' + i + '-label',
                    htmlFor: field
                }, field + ": "),
                React.DOM.input({
                    key: 'input-' + i + '-field',
                    value: this.state[field],
                    name: field,
                    onChange: this.handleInputChange
                })
            ]);
        }, this);
        inputs.push(React.DOM.button({
            key: 'input-button',
            onClick: this.saveNewActivity
        }, 'Save'))
        return React.DOM.div(null, inputs);
    },
    saveNewActivity: function() {
        var newActivity = {};
        fields.forEach(function(field) {
            newActivity[field] = this.state[field];
        }, this);
        this.props.saveNewActivity(newActivity);
        this.setState(this.getInitialState());
    },
    handleInputChange: function(event) {
        this.state[event.target.name] = event.target.value;
        this.setState(this.state);
    },
});
