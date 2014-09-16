(function() {

    var ActivityOverview = require('./views/activityOverview');
    var React = require('react');

    React.renderComponent(
        ActivityOverview(),
        document.getElementById('container')
    );

}());
