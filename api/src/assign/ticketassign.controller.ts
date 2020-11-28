import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketAssignService } from './ticketassign.service';
import { CreateTicketAssignDto } from './dto/create-ticketassign.dto';
import { UpdateTicketAssignDto } from './dto/update-ticketassign.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ticket')
@Controller('/api/ticket/assign')
export class TicketAssignController {
  constructor(private readonly ticketAssignService: TicketAssignService) {}
  /* Working Implementation */
  @Post()
  async create(@Body() createTicketAssignDto: CreateTicketAssignDto) {
    return await this.ticketAssignService.create(createTicketAssignDto);
  }
  /* TODO */
  @Get()
  findAll() {
    return this.ticketAssignService.findAll();
  }
  /* TODO */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketAssignService.findOne(+id);
  }
  /* TODO */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketAssignDto: UpdateTicketAssignDto,
  ) {
    return this.ticketAssignService.update(+id, updateTicketAssignDto);
  }
  /* TODO */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketAssignService.remove(+id);
  }
}
