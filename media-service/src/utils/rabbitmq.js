const amqp = require("amqplib");
const logger = require("./logger");

let connection = null;
let channel = null;

const EXCHANGE_NAME = "social_media_events";

async function connectToRabbitMQ() {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, "topic", { durable: false });
        logger.info("Connected to rabbit mq");
        return channel;
    } catch (e) {
        logger.error("Error connecting to rabbit mq", e);
    }
}

async function consumeEvent(routingKey, callback) {
    if (!channel) {
        await connectToRabbitMQ();
    }

    // Assert a queue into existence.
    const q = await channel.assertQueue("", { exclusive: true });
    // exclusive: if true, scopes the queue to the connection (defaults to false)

    // Assert a routing path from an exchange to a queue
    // Syntax: #bindQueue(queue, source, pattern, [args])
    await channel.bindQueue(q.queue, EXCHANGE_NAME, routingKey);

    // Set up a consumer with a callback to be invoked with each message., aka. "Event Listener" for the queue.
    // Syntax: #consume(queue, function(msg) {...}, [options])
    channel.consume(q.queue, (msg) => {
        if (msg !== null) {
            // content = passed content arg from publishEvent
            const content = JSON.parse(msg.content.toString());
            callback(content);

            // Acknowledge the given message, telling RabbitMQ that this message is successfully processed and so it can remove it from the queue now.
            // Syntax: #ack(message, [allUpTo])
            channel.ack(msg);
        };
    });

    logger.info(`Subscribed to event: ${routingKey}`);
}

module.exports = { connectToRabbitMQ, consumeEvent };