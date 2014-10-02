(function() {

    var React = require('react');
    var MainView = require('./views/mainView');
    var Events = require('./models/events');
    var Activities = require('./models/activities');

    var events = new Events();

    React.renderComponent(
        MainView({
            events: new Events(),
            activities: new Activities()
        }),
        document.getElementById('container')
    );

}());
