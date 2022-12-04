import { injectable } from 'inversify';
import * as path from 'path';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { MailDto } from '../dto/mail.dto';
import { MailFactory } from '..//factory/mail.factory';
import hbs from 'nodemailer-express-handlebars';
import 'reflect-metadata';

export interface IMailService{
    sendMail(config: any): any
}

/////Mail Module
class Mail{
	async send(payload: MailDto): Promise<void> {

		const mailConfig = new MailDto(
			payload.to,
			payload.context,
			payload.subject,
			payload.template,
		);
        
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			tls: { 
				rejectUnauthorized: false 
			},
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASS,
			},
		});

		const handlebarOptions: any = {
			viewEngine: {
				extName: '.hbs',
				partialsDir: path.resolve('./src/app/mail/templates'),
				defaultLayout: false,
			},
			viewPath: path.resolve('./src/app/mail/templates'),
			extName: '.hbs',
		};

		transporter.use('compile', hbs(handlebarOptions));

		const mailOption = {
			from: process.env.EMAIL,
			...mailConfig
		};

        
		transporter.sendMail(mailOption, (error, res) => {
			if (error) { console.log(error); }
			else { console.log(res); }
		});
	}
}


//Mail Service
@injectable()
export class MailService implements IMailService{
	constructor(
	) { }
    
	async sendMail(config: any) {
        
		/////Get Config from factory
		const mailConfig = MailFactory.getConfig(config);
        
		new Mail().send(mailConfig);
	}
}



