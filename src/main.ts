import { Mail } from './app/mail';


async function bootstrap() {
	///Mailer Service
	new Mail().listen();

	console.log('Live Apps Utils Microservice Started');
}

bootstrap();