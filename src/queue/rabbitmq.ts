import amqp from 'amqplib';

const rabbitURL = 'amqp://queue.jaga.live?heartbeat=30';
const RABBIT_USER = process.env.RABBIT_USER;
const RABBIT_PASS = process.env.RABBIT_PASS;
const opt = { credentials: require('amqplib').credentials.plain(RABBIT_USER, RABBIT_PASS) };

let channel = null;
export const rabbitClient = async () => {
	const connection = await amqp.connect(rabbitURL, opt);
	channel = await connection.createChannel();
	return channel;
};


