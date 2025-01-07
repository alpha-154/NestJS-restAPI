import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users') // `/users` route
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // GET method -> `/users` or /users?role=admin
  findAll(@Query('role') role?: 'admin' | 'customer' | 'user') {
    return this.usersService.findAll(role);
  }

  @Get('interns') // GET method -> `/users/interns`
  findAllInterns() {
    return [];
  }

  @Get(':id') // GET method -> `/users/:id`
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @Post() // POST method -> `/users`
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }
  @Patch(':id') // PATCH method -> `/users/:id`
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete(':id') // DELETE method -> `/users/:id`
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
