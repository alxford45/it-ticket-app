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
  /* WORKING implementation */
  @Post()
  async create(@Body() createUserDto: CreateUser) {
    return await this.userService.create(createUserDto);
  }
  /* WORKING implementation */
  @Get()
  findAll() {
    return this.userService.findAll(UserType.USER);
  }

  /* WORKING implementation */
  @Get('/admin')
  findAllAdmin() {
    return this.userService.findAll(UserType.ADMIN);
  }

  /* WORKING implementation */
  @Get('/student')
  findAllStudents() {
    return this.userService.findAll(UserType.STUDENT);
  }

  /* WORKING implementation */
  @Get(':lsu_id')
  findOne(@Param('lsu_id') lsu_id: number) {
    return this.userService.findOne(lsu_id);
  }
}
