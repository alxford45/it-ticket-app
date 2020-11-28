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
import { CreateUserDTO } from './dto/create-user.dto';
import { UserType } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/update-user.dto';

@ApiTags('user')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /* WORKING implementation */
  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
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

  /* WORKING implementation */
  @Put(':lsu_id')
  update(
    @Param('lsu_id') lsu_id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.update(lsu_id, updateUserDTO);
  }
}
