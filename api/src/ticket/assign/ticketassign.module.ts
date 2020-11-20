import { Module } from '@nestjs/common';
import { TicketAssignService } from './ticketassign.service';
import { TicketAssignController } from './ticketassign.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports:[DbModule],
  controllers: [TicketAssignController],
  providers: [TicketAssignService]
})
export class TicketAssignModule {}
