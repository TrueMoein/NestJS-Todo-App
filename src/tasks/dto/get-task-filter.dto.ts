import { TaskStatus } from '../task.model';
import { IsIn, IsOptional } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  search: string;

  @IsOptional()
  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN])
  status: TaskStatus;
}
