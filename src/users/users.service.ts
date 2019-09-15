import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Task } from 'src/tasks/task.entity';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async createUser(user: CreateUserDto) {
    const { name, email, phone } = user;
    const existUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (existUser) {
      throw new ConflictException(
        `user with email ${existUser.email} or phone number ${
          existUser.phone
        } was exist.`,
      );
    } else {
      const newUser = new User(name, email, phone);

      await newUser.save();

      return newUser;
    }
  }

  async getUserTasks(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['tasks'] });
  }
}
