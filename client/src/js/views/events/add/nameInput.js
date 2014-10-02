var React = require('react');

var NameInput = React.createClass({
    handleInputChange: function(event) {
        this.props.setName(event.target.value);
    },
    render: function() {
        var nameOptions = this.props.activities.map(function(activity, i) {
            return React.DOM.option({
                key: i + 1,
                value: i + 1
            }, activity.get('name'));
        });
        nameOptions.unshift(React.DOM.option({
            key: 'null',
            value: 0
        }, ''));
        var nameInput = React.DOM.select({
            key: 'nameinput',
            name: 'name',
            onChange: this.handleInputChange
        }, nameOptions);
        var nameLabel = React.DOM.label({
            key: 'namelabel',
            htmlFor: 'name'
        }, 'Name');
        return React.DOM.div(
            null,
            [nameLabel, nameInput]
        );
    }
});

module.exports = NameInput;
