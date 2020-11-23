import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    Logger.log(
      { req: { http: 'GET', params: 'none', body: 'none' } },
      'App.getHello',
    );
    return this.appService.getHello();
  }
}
