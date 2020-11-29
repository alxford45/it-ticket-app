import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AssignmentService } from './assignment.service';
import { AssignmentType } from './dto/assignment.dto';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';

@ApiTags('assignment')
@Controller('/api/assign')
export class AssignmentController {
  constructor(private readonly ticketAssignService: AssignmentService) {}

  /* WORKING Implementation */
  /* TODO: fix date formatting */
  @Post()
  async create(@Body() createAssignmentDTO: CreateAssignmentDTO) {
    return await this.ticketAssignService.create(createAssignmentDTO);
  }

  /* WORKING Implementation */
  @Get()
  findAll() {
    return this.ticketAssignService.findAll();
  }

  /* WORKING Implementation */
  @Get('user/:lsu_id')
  findAllByLsuId(@Param('lsu_id') lsu_id: number) {
    return this.ticketAssignService.findAllById(AssignmentType.LSU_ID, lsu_id);
  }

  /* WORKING Implementation */
  @Get('ticket/:ticket_id')
  findAllByTicketId(@Param('ticket_id') ticket_id: number) {
    return this.ticketAssignService.findAllById(
      AssignmentType.TICKET_ID,
      ticket_id,
    );
  }

  /* WORKING Implementation */
  @Get(':assignment_id')
  findOne(@Param('assignment_id') assignment_id: string) {
    return this.ticketAssignService.findOne(+assignment_id);
  }
}
