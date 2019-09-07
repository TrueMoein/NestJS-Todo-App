import { TaskStatus } from '../enums/TaskStatus.enum';
import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS])
  status: TaskStatus;
}
