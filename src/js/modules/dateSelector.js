var React = require('react');

module.exports = React.createClass({
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
