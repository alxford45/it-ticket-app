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
import { CreateUser } from './dto/create-user.dto';
import { UserType } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /* TODO: test implementation */
  @Post()
  async create(@Body() createUserDto: CreateUser) {
    return await this.userService.create(createUserDto);
  }
  /* TODO: test implementation */
  @Get()
  findAll() {
    return this.userService.findAll(UserType.USER);
  }

  /* TODO: test implementation */
  @Get('/admin')
  findAllAdmin() {
    return this.userService.findAll(UserType.ADMIN);
  }

  /* TODO: test implementation */
  @Get('/student')
  findAllStudents() {
    return this.userService.findAll(UserType.STUDENT);
  }

  /* TODO: test implementation */
  @Get(':id')
  findOne(@Param('lsu_id') lsu_id: number) {
    return this.userService.findOne(lsu_id);
  }
}
