import { TaskStatus } from './enums/TaskStatus.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task extends BaseEntity {
  constructor(title: string, description: string) {
    super();
    this.title = title;
    this.description = description;
    this.status = TaskStatus.OPEN;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.id)
  user: User;
}
