import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechModule } from './tech/tech.module';
import { TicketModule } from './ticket/ticket.module';
import { TicketWorkModule } from './ticket/work/ticketwork.module';
import { TicketAssignModule } from './ticket/assign/ticketassign.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/build'),
      exclude: ['/api*', '/auth'],
    }),
    TechModule,
    TicketModule,
    TicketWorkModule,
    TicketAssignModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
