import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ticket')
@Controller('/api/ticket/assign')
export class AssignmentController {
  constructor(private readonly ticketAssignService: AssignmentService) {}
  /* Working Implementation */
  @Post()
  async create(@Body() createTicketAssignDto: CreateAssignmentDTO) {
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
    @Body() updateTicketAssignDto: UpdateAssignmentDTO,
  ) {
    return this.ticketAssignService.update(+id, updateTicketAssignDto);
  }
  /* TODO */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketAssignService.remove(+id);
  }
}
