import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Logger,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicket } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags } from '@nestjs/swagger';
import { Ticket, TicketType } from './dto/ticket.dto';

@ApiTags('ticket')
@Controller('/api/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  /* TODO: test implementation */
  @Post()
  create(@Body() createTicketDto: CreateTicket) {
    Logger.log(
      {
        req: {
          http: 'POST /api/ticket',
          params: 'none',
          body: createTicketDto,
        },
      },
      'TicketController.create',
      false,
    );
    return this.ticketService.create(createTicketDto);
  }

  /* Working implementation */
  @Get()
  findAll() {
    return this.ticketService.findAll(TicketType.ANY);
  }
  /* Working implementation */
  @Get('/opened')
  findAllOpened() {
    return this.ticketService.findAll(TicketType.OPENED);
  }

  /* Working implementation */
  @Get('/closed')
  findAllClosed() {
    return this.ticketService.findAll(TicketType.CLOSED);
  }

  /* Working implementation */
  @Get('/user/:lsu_id')
  findAllByLsuId(@Param('lsu_id') lsu_id: number) {
    return this.ticketService.findAll(lsu_id);
  }

  /* Working implementation */
  @Get(':ticket_id')
  findOne(@Param('ticket_id') ticket_id: number) {
    return this.ticketService.findOne(+ticket_id);
  }

  /* TODO: FIX */
  /* NOT WORKING */
  @Put(':id')
  update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    Logger.log(
      {
        req: {
          http: `PUT /api/ticket/${id}`,
          params: id,
          body: updateTicketDto,
        },
      },
      'TicketController.update',
      false,
    );

    return this.ticketService.update(id, updateTicketDto);
  }
}
