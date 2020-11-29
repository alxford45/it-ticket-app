import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateWorkDTO } from './dto/create-work.dto';
import { WorkType } from './dto/work.dto';
import { WorkService } from './work.service';

@ApiTags('work')
@Controller('/api/work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  /* Working Implementation */
  @Post()
  async create(@Body() createWorkDTO: CreateWorkDTO) {
    return await this.workService.create(createWorkDTO);
  }

  /* Working Implementation */
  @Get()
  findAll() {
    return this.workService.findAll();
  }

  /* Working Implementation */
  @Get('ticket/:ticket_id')
  findAllByTicketId(@Param('ticket_id') ticket_id: number) {
    return this.workService.findAllById(WorkType.TICKET_ID, ticket_id);
  }

  /* Working Implementation */
  @Get('user/:lsu_id')
  findAllByLsuId(@Param('lsu_id') lsu_id: number) {
    return this.workService.findAllById(WorkType.LSU_ID, lsu_id);
  }

  /* Working Implementation */
  @Get(':work_id')
  findOne(@Param('work_id') id: number) {
    return this.workService.findOne(+id);
  }
}
