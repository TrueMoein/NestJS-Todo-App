import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../enums/TaskStatus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly validStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ];

  transform(value: string) {
    value = value.toUpperCase();

    if (!this.validStatus(value)) {
      throw new BadRequestException(`${value} حالت مناسبی برای تسک ها نمی‌باشد. `);
    }

    return value;
  }

  private validStatus(status) {
    return this.validStatuses.indexOf(status) !== -1;
  }
}
