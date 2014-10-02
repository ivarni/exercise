var React = require('react');

var Input = React.createClass({
    handleInputChange: function(event) {
        this.props.setValue(this.props.field, event.target.value);
    },
    render: function() {
        var label = React.DOM.label({
            key: 'label',
            htmlFor: this.props.field
        }, this.props.field);
        var input = React.DOM.input({
            key: 'input',
            type: 'number',
            name: this.props.field,
            onChange: this.handleInputChange
        });
        return React.DOM.div(
            null,
            [label, input]
        );
    }
});

module.exports = Input;
