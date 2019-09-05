import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(filter: GetTaskFilterDto): Task[] {
    if (!Object.keys(filter).length) {
      return this.tasks;
    }
    return this.getFilteredTasks(filter);
  }

  getFilteredTasks(filter: GetTaskFilterDto): Task[] | [] {
    const { status, search } = filter;
    let tasks = this.tasks;

    if (status) {
       tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task =>  task.title.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id '${id}' not found!`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      description,
      title,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(updateTaskStatusDto: UpdateTaskStatusDto) {
    const { id, status } = updateTaskStatusDto;

    this.tasks = this.tasks.map(task => {
      return task.id === id ? {...task, status} : task;
    });
  }
}
