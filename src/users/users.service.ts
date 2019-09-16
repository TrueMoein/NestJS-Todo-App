import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly mailerService: MailerService,
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

    if (!existUser) {
      const newUser = new User(name, email, phone);

      await newUser.save();

      this.mailerService.sendMail({
        to: email,
        subject: `Wellcome ${name} ✔`,
        template: 'email-verification',
        context: {
          name,
          email,
          phone,
        },
      });

      return newUser;
    } else {
      throw new BadRequestException('A user with this information are exists!');
    }
  }

  async getUserTasks(id: number): Promise<User> {
    return await this.userRepository.findOne(id, { relations: ['tasks'] });
  }
}
