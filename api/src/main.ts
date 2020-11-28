import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.NODE_ENV;

const logBootstrap = () => {
  Logger.verbose(`Now listening on port ${PORT} in ${ENV}`, 'Bootstrap');
  Logger.verbose(
    `View and test API Schema: http://${HOST}:${PORT}/api/docs`,
    'Bootstrap',
  );
  const message =
    ENV === 'production'
      ? `Client bundled and served at: http://${HOST}:${PORT}`
      : `Serve client separately at: http://${HOST}:3000`;
  Logger.verbose(message, 'Bootstrap');
};
async function bootstrap() {
  const appOptions: NestApplicationOptions = { cors: true, bodyParser: true };
  const app = await NestFactory.create(AppModule, appOptions);

  const options = new DocumentBuilder()
    .setTitle('Support Ticket API')
    .setDescription('complete documentation for backend api')
    .setVersion('0.1.0')
    .setExternalDoc(
      'additional documentation',
      `https://github.com/cdalton713/CSC_4402_DB_Project/blob/master/api/README.md`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  // Starts listening for shutdown hooks emitted by heroku
  app.enableShutdownHooks();

  await app.listen(PORT, logBootstrap);
}
bootstrap();
