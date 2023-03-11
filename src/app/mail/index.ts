import amqp from 'amqplib';
import 'dotenv/config';
import { MailDto, MailReqEvent } from './dto/mail.dto';
import { MailService } from './service/mail.service';

const rabbitURL = 'amqp://queue.jaga.live?heartbeat=30';
const RABBIT_USER = process.env.RABBIT_USER;
const RABBIT_PASS = process.env.RABBIT_PASS;
const opt = { credentials: require('amqplib').credentials.plain(RABBIT_USER, RABBIT_PASS) };


export class Mail{
	async listen() {
		const connection = await amqp.connect(rabbitURL, opt);
		const channel = await connection.createChannel();
		channel.consume('send_mail', message => {

			const res = JSON.parse(message.content.toString());
        
			const mailDto = new MailReqEvent(
				res.to,
				res.context,
				res.type
			);

			///Send Mail
			new MailService().sendMail(mailDto);

		}, { noAck: true });
	}

    
}