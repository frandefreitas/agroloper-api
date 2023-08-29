import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsInt } from 'class-validator';

export class UpdateSchedulingDto {
  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'ID of the person for whom the scheduling is created',
    name: 'person',
  })
  @IsOptional()
  personId?: number;

  @ApiProperty({
    type: 'integer',
    description: 'ID of the instrument or machine',
  })
  @IsInt()
  @IsOptional()
  instrumentId?: number;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    description: 'Date and time of the scheduling',
  })
  @IsOptional()
  @IsDateString()
  scheduled_date_time?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Description of the scheduling',
  })
  @IsOptional()
  scheduling_description?: string;
}
