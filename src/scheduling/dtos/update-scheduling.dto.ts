import { IsOptional, IsDateString } from 'class-validator';

export class UpdateSchedulingDto {
  @IsOptional()
  personId: number;

  @IsOptional()
  @IsDateString()
  scheduled_date_time: string;

  @IsOptional()
  scheduling_description: string;
}
