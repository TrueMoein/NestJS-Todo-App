import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  AfterInsert,
} from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Verification } from './verification';

@Entity()
export class User extends BaseEntity {
  constructor(name: string, email: string, phone: string) {
    super();

    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, default: null })
  phone: string;

  @OneToMany(type => Task, task => task.user)
  tasks: Task[];

  @AfterInsert()
  sendVerifications() {
    Verification(this.email, this.phone);
  }
}
