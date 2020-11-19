import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';


@Module({
  imports: [ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/build'),
      exclude: ['/api*','/auth']
    }), UserModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
}
