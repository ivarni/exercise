var React = require('react');

module.exports = React.createClass({
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
