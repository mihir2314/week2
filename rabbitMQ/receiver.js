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
        channel.consume(queue, (messae) => {
            console.log(`message reveived is : ${messae.content.toString()}`)

        }, {
            noAck: true
        })


    })
})