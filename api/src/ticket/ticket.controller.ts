import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCombinedDTO } from './dto/create-combined.dto';
import { TicketType } from './dto/ticket.dto';
import { UpdateCombinedDTO } from './dto/update-combined.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@ApiTags('ticket')
@Controller('/api/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  /* WORKING Implementation */
  @Post()
  create(@Body() createCombinedDTO: CreateCombinedDTO) {
    Logger.log(
      {
        req: {
          http: 'POST /api/ticket',
          params: 'none',
          body: createCombinedDTO,
        },
      },
      'TicketController.create',
      false,
    );
    return this.ticketService.create(createCombinedDTO);
  }

  /* WORKING Implementation */
  @Get()
  findAll() {
    return this.ticketService.findAll(TicketType.ANY);
  }
  /* WORKING Implementation */
  @Get('/opened')
  findAllOpened() {
    return this.ticketService.findAll(TicketType.OPENED);
  }

  /* WORKING Implementation */
  @Get('/closed')
  findAllClosed() {
    return this.ticketService.findAll(TicketType.CLOSED);
  }

  /* WORKING Implementation */
  @Get('/user/:lsu_id')
  findAllByLsuId(@Param('lsu_id') lsu_id: number) {
    return this.ticketService.findAll(lsu_id);
  }

  /* WORKING Implementation */
  @Get(':ticket_id')
  findOne(@Param('ticket_id') ticket_id: number) {
    return this.ticketService.findOne(+ticket_id);
  }

  /* WORKING Implementation */
  @Put(':ticket_id')
  update(
    @Param('ticket_id') ticket_id: number,
    @Body() updateCombinedDTO: UpdateCombinedDTO,
  ) {
    return this.ticketService.update(ticket_id, updateCombinedDTO);
  }
}
