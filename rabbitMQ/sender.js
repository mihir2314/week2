
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((channelerr, channel) => {
        if (channelerr) {
            throw channelerr;
        }
        const queue = 'testing queue2'
        channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from('its my first message from rabbitmq2'));
        console.log(`message send to ${queue}`);

    })
})
