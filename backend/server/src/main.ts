import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // for cors to talk to frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://shalompay.vercel.app/'
      // "https://novapay-six.vercel.app"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(cookieParser())

  // await app.listen(process.env.PORT ?? 5000);
  const port = Number(process.env.PORT) || 5000;
  await app.listen(port);
  console.log(`Server listening on port ${port}`);
}
bootstrap();
