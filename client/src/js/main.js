(function() {

    var React = require('react');

    var ActivityOverview = require('./views/activityOverview');
    var Events = require('./models/events');

    React.renderComponent(
        ActivityOverview({
            events: new Events()
        }),
        document.getElementById('container')
    );

}());
