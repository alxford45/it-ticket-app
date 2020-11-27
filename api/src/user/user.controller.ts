import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateCustomerDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customer')
@Controller('/api/customer')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /* TODO: test implementation */
  @Post()
  async create(@Body() createUserDto: CreateCustomerDto) {
    return await this.userService.create(createUserDto);
  }
  /* TODO: test implementation */
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  /* TODO: test implementation */
  @Get(':id')
  findOne(@Param('lsu_id') lsu_id: number) {
    return this.userService.findOne(lsu_id);
  }
}
