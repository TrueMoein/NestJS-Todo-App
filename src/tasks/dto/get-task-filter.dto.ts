import { TaskStatus } from '../enums/TaskStatus.enum';
import { IsIn, IsOptional } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  search: string;

  @IsOptional()
  @IsIn([ TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN ], {
    message: `${[ TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN ]} یکی از این مقادیر را برای جستجو در وضعیت تسک ها وارد نمایيد`,
  })
  status: TaskStatus;
}
