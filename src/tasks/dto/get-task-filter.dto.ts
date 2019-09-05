import { TaskStatus } from '../task.model';

export class GetTaskFilterDto {
  search: string;
  status: TaskStatus;
}
