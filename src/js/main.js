(function() {

    var ActivityOverview = require('./modules/activityOverview');
    var React = require('react');

    React.renderComponent(
        ActivityOverview(),
        document.getElementById('container')
    );

}());
