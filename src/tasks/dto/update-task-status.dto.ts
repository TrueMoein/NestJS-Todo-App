import { TaskStatus } from '../enums/TaskStatus.enum';

export class UpdateTaskStatusDto {
  id: number;
  status: TaskStatus;
}
