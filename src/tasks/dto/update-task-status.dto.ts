import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  id: string;
  status: TaskStatus;
}
