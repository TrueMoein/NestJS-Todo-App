import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { queryConfig } from '../config/query.config';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTaskFilterDto): Promise<any> {
    const { status, search, offset, limit } = filterDto;

    const query = this.createQueryBuilder('task');

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
}
