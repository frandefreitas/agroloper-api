import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSchedulingDto {
  @ApiProperty({
    type: 'integer',
    required: true,
    description: 'ID of the person for whom the scheduling is created',
    name: 'person',
  })
  @IsNotEmpty()
  personId: number;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: true,
    description: 'Date and time of the scheduling',
  })
  @IsNotEmpty()
  @IsDateString()
  scheduled_date_time: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Description of the scheduling',
  })
  @IsNotEmpty()
  scheduling_description: string;
}
