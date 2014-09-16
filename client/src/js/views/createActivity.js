var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            adding: false,
            name: ''
        }
    },
    handleStateChange: function(event) {
        this.setState({ name: event.target.value });
    },
    saveActivity: function() {
        this.props.saveNewActivity(this.state.name);
        this.setState(this.getInitialState());
    },
    render: function() {
        var elements = [];
        elements.push(React.DOM.button({
                key: 'add-activity-button',
                onClick: this.toggleAdd
            }, this.state.adding ? 'Cancel' : 'Add')
        );
        if (this.state.adding) {
            elements.push(React.DOM.input({
                key: 'add-activity-input',
                onChange: this.handleStateChange,
                value: this.state.name,
                name: 'name'
            }));
            elements.push(React.DOM.button({
                key: 'add-activit-save',
                onClick: this.saveActivity
            }, 'Save'));
        }
        return React.DOM.div(null, elements);
    },
    toggleAdd: function() {
        this.setState({ adding: !this.state.adding });
    }
});
