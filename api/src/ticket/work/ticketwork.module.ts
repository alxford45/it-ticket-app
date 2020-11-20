import { Module } from '@nestjs/common';
import { TicketWorkService } from './ticketwork.service';
import { TicketWorkController } from './ticketwork.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports:[DbModule],
  controllers: [TicketWorkController],
  providers: [TicketWorkService]
})
export class TicketWorkModule {}
