import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

async function bootstrap() {
  const appOptions: NestApplicationOptions = { cors: true, bodyParser: true };
  const app = await NestFactory.create(AppModule, appOptions);

  const options = new DocumentBuilder()
    .setTitle('Support Ticket API')
    .setDescription('complete documentation for backend api')
    .setVersion('0.1.0')
    .setExternalDoc(
      'additional documentation',
      `http://${HOST}:${PORT}/api/docs/more`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  // Starts listening for shutdown hooks emitted by heroku
  app.enableShutdownHooks();

  await app.listen(PORT, () => {
    Logger.debug(`Now listening on port ${PORT}`, 'Main.bootstrap');
    Logger.debug(
      `View and test API Schema: http://${HOST}:${PORT}/api/docs`,
      'Main.bootstrap',
    );
    Logger.debug(`Client served: http://${HOST}:${PORT}`, 'Main.bootstrap');
  });
}
bootstrap();
