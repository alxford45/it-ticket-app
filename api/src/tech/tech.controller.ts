import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TechService } from './tech.service';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tech')
@Controller('/api/tech')
export class TechController {
  constructor(private readonly techService: TechService) {}
  /* Working Implementation */
  @Post()
  async create(@Body() createTechDto: CreateTechDto) {
    return await this.techService.create(createTechDto);
  }
  /* TODO */
  @Get()
  findAll() {
    return this.techService.findAll();
  }
  /* TODO */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techService.findOne(+id);
  }
  /* TODO */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTechDto: UpdateTechDto) {
    return this.techService.update(+id, updateTechDto);
  }
  /* TODO */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.techService.remove(+id);
  }
}
