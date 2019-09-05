import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({
    message: 'نام تسک ضروری است.',
  })
  title: string;

  @IsNotEmpty({
    message: 'توضیحات تسک ضروری است.',
  })
  description: string;
}
