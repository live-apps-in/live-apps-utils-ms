import { Logger } from './app/logger';
import { Mail } from './app/mail';


async function bootstrap() {
	///Mailer Service
	new Mail().listen();

	///Logger Service
	new Logger().listen();

	console.log('Live Apps Utils Microservice Started');
}

bootstrap();