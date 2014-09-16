var React = require('react');

module.exports = React.createClass({
    render: function() {
        return React.DOM.button({
            onClick: this.handleClick,
        }, '+')
    },
    handleClick: function() {
        this.props.saveNewEvent();
    }
});
