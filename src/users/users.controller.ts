import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() id: number) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Get(':id/tasks')
  getUserTasks(@Param() id: number) {
    return this.usersService.getUserTasks(id);
  }
}
