import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ticket')
@Controller('/api/ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  /* Working Implementation */
  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketService.create(createTicketDto);
  }
  /* TODO */
  @Get()
  findAll() {
    return this.ticketService.findAll();
  }
  /* TODO */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }
  /* TODO */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }
  /* TODO */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
