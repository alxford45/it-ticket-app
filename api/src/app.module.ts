import { Logger, Module, ModuleMetadata } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import { WorkModule } from './work/work.module';
import { AssignmentModule } from './assignment/assignment.module.';
import { UserModule } from './user/uer.module';

/**
 *
 * @param modules
 * @returns Production Environment ? [ServeSataticModule, ...modules]
 *                                 : [...modules]
 *
 * DEV Script: yarn start:dev | yarn start
 * - Serve ONLY server at http://localhost:5000
 * - Start client on a different terminal at http://localhost:3000
 *
 * PROD Script: yarn start:prod:
 * - Serves both client and server on single terminal at http://${process.env.HOST}:5000
 */
const configImports = (modules: ModuleMetadata['imports']) => {
  Logger.verbose(`Environment set to: ${process.env.NODE_ENV}`, 'ConfigModule');

  const ClientModule = ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..', 'client/build'),
    exclude: ['/api*'],
  });

  modules =
    process.env.NODE_ENV === 'production'
      ? [ClientModule, ...modules]
      : [...modules];

  return modules;
};

@Module({
  imports: configImports([
    TicketModule,
    WorkModule,
    AssignmentModule,
    UserModule,
  ]),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
