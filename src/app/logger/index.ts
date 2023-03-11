import 'dotenv/config';
import { rabbitClient } from '../../queue/rabbitmq';
import amqp from 'amqplib';

export class Logger{
	async listen() {
		// const connection = await amqp.connect(rabbitURL, opt);
		// const channel = await connection.createChannel();
		return;
		const channel = await rabbitClient();
		channel.consume('logger', message => {

			const res = JSON.parse(message.content.toString());
        
		    console.log(res);


		}, { noAck: true });
	}

    
}