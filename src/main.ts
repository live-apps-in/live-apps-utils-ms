import { Mail } from './app/mail';


async function bootstrap() {
	new Mail().listen();
}

bootstrap();