import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        secureConnection: true,
        host: 'smtp.gmail.com',
        port: '587',
        auth: {
          user: 'nest.todo@gmail.com',
          pass: 'nest-todo-email123',
        },
        secure: false,
        debug: true,
      },
      defaults: {
        from: 'nest.todo@gmail.com',
      },
      template: {
        dir: __dirname + '/../src/mail-templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
