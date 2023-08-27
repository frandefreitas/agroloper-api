import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSchedulingDto {
  @IsNotEmpty()
  personId: number;

  @IsNotEmpty()
  @IsDateString()
  scheduled_date_time: string;

  @IsNotEmpty()
  scheduling_description: string;
}
