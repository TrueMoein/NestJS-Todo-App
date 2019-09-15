import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Repository } from 'typeorm';
import { queryConfig } from '../config/query.config';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search, offset, limit } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', {status});
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        {search: `%${search}%`},
      );
    }

    query.limit(limit || queryConfig.defaultPageSize);
    query.offset(offset);

    return await query.getMany();
  }

  async getTasksById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id '${id}' was not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task(title, description);

    await task.save();

    return task;
  }

  async updateTaskStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task: Task = await this.getTasksById(id);

    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: number): Promise<string> {
    const task: Task = await this.getTasksById(id);

    await this.taskRepository.delete(task);

    return `Task with id '${id}' was deleted.`;
  }
}
