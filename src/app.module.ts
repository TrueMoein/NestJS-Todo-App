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
          user: '3moein@gmail.com',
          pass: 'testtesttest!fake!fake!fake!fuck!',
        },
      },
      defaults: {
        from: 'truemoein@gmail.com',
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
