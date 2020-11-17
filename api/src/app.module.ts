import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';


@Module({
  imports: [ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client/build'),
      exclude: ['/api*','/auth']
    }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
}
