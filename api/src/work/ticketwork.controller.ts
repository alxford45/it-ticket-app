import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketWorkService } from './ticketwork.service';
import { CreateTicketWorkDto } from './dto/create-ticketwork.dto';
import { UpdateTicketWorkDto } from './dto/update-ticketwork.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ticket')
@Controller('/api/ticket/work')
export class TicketWorkController {
  constructor(private readonly ticketWorkService: TicketWorkService) {}
  /* Working Implementation */
  @Post()
  async create(@Body() createTicketWorkDto: CreateTicketWorkDto) {
    return await this.ticketWorkService.create(createTicketWorkDto);
  }
  /* TODO */
  @Get()
  findAll() {
    return this.ticketWorkService.findAll();
  }
  /* TODO */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketWorkService.findOne(+id);
  }
  /* TODO */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTicketWorkDto: UpdateTicketWorkDto) {
    return this.ticketWorkService.update(+id, updateTicketWorkDto);
  }
  /* TODO */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketWorkService.remove(+id);
  }
}
