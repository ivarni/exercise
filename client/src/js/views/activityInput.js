var React = require('react');

var fields = require('../config/fields')
var selectData = require('../config/selectData')

//This component is getting too big...
module.exports = React.createClass({
    getInitialState: function() {
        var state = {};
        fields.forEach(function(field) {
            state[field.name] = '';
        });
        return state;
    },
    render: function() {
        var inputs = fields.map(function(field, i) {
            var parts = [
                React.DOM.label({
                    key: 'input-' + i + '-label',
                    htmlFor: field.name
                }, field.name + ": ")
            ];
            if (field.type === 'input') {
                parts.push(
                    React.DOM.input({
                        key: 'input-' + i + '-field',
                        value: this.state[field.name],
                        name: field.name,
                        onChange: this.handleInputChange
                    })
                );
            } else if (field.type === 'select') {
                var options = selectData[field.name].map(function(option, i) {
                    return React.DOM.option({
                        key: field.name + '-option-' + i,
                        value: i
                    }, option);
                });
                parts.push(
                    React.DOM.select({
                        key: 'input-' + i + '-field',
                        name: field.name,
                        defaultValue: 0,
                        onChange: this.handleInputChange
                    }, options)
                );
            }
            return React.DOM.div({ key: 'input-' + i}, parts);
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
            if (field.type === 'input') {
                newActivity[field.name] = this.state[field.name];
            } else if (field.type === 'select') {
                newActivity[field.name] = selectData[field.name][this.state[field.name]];
            }
        }, this);
        this.props.saveNewActivity(newActivity);
        this.setState(this.getInitialState());
    },
    handleInputChange: function(event) {
        this.state[event.target.name] = event.target.value;
        this.setState(this.state);
    },
});
