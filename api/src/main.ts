import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 5000;
async function bootstrap() {
  const appOptions: NestApplicationOptions = {cors: true, bodyParser:true}
  const app = await NestFactory.create(AppModule, appOptions);

  const options = new DocumentBuilder()
    .setTitle('Support Ticket API')
    .setDescription('complete documentation for backend api')
    .setVersion('0.1.0')
    .setBasePath('api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

   // Starts listening for shutdown hooks emitted by heroku
  app.enableShutdownHooks();

  await app.listen(PORT,() => console.log(`Now listening on port ${PORT}`));
}
bootstrap();
