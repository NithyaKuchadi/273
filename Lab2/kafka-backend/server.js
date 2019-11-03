var connection = new require('./kafka/Connection');

//topics file
var signupLoginTopics = require('./services/signupLoginTopics.js');
var restaurantTopics = require('./services/restaurantTopics.js');
var profileTopics = require('./services/profileTopics.js');
var menuTopics = require('./services/menuTopics.js');
var orderTopics = require('./services/orderTopics.js');
var inboxTopics = require('./services/inboxTopics.js');

// Set up Database connection
var config = require('./config/settings');
var mongoose = require('mongoose');

console.log(config.connection_string);
mongoose.connect(config.connection_string, { useNewUrlParser: true, poolSize: 10 }, function (err) {
    if (err) throw err;
    else {
        console.log('Successfully connected to MongoDB');
    }
});

console.log('Kafka server is running ');

function handleTopicRequest(topic_name, fname) {
    console.log("topic_name:", topic_name)
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    consumer.on('error', function (err) {
        console.log("Kafka Error: Consumer - " + err);
    });
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        switch (topic_name) {

            case 'signupLogin_Topics':
                signupLoginTopics.signupLoginService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'restaurant_Topics':
                restaurantTopics.restaurantService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'profile_Topics':
                profileTopics.profileService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'menu_Topics':
                menuTopics.menuService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'order_Topics':
                orderTopics.orderService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;
            case 'inbox_Topics':
                inboxTopics.inboxService(data.data, function (err, res) {
                        response(data, res, producer);
                        return;
                    });
                    break;
        }
    })
};

function response(data, res, producer) {
    console.log('after handle', res);
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partition: 0
        }
    ];
    producer.send(payloads, function (err, data) {
        console.log('producer send', data);
    });
    return;
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signupLogin_Topics", signupLoginTopics);
handleTopicRequest("restaurant_Topics", restaurantTopics);
handleTopicRequest("profile_Topics", profileTopics);
handleTopicRequest("menu_Topics", menuTopics);
handleTopicRequest("order_Topics", orderTopics);
handleTopicRequest("inbox_Topics", inboxTopics);
