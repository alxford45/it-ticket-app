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
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ticket')
@Controller('/api/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  /* TODO: test implementation */
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
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
  /* TODO: test implementation */
  @Get()
  findAll() {
    Logger.log(
      {
        req: {
          http: 'GET /api/ticket',
          params: 'none',
          body: 'none',
        },
      },
      'TicketController.findAll',
      false,
    );

    return this.ticketService.findAll();
  }
  /* TODO: test implementation */
  @Get(':id')
  findOne(@Param('id') id: number) {
    Logger.log(
      {
        req: {
          http: `GET /api/ticket/${id}`,
          params: id,
          body: 'none',
        },
      },
      'TicketController.findOne',
      false,
    );

    return this.ticketService.findOne(+id);
  }
  /* TODO: test implementation */
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
