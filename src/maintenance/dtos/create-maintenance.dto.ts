import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import {
  MaintenanceRevisionType,
  ItemType,
} from '../entities/maintenance.entity';

export class CreateMaintenanceDto {
  @ApiProperty({
    type: 'integer',
    description: 'ID of the instrument or machine',
  })
  @IsInt()
  item_id: number;

  @ApiProperty({
    enum: ItemType,
    description: 'Type of the item (Instrument or Machine)',
  })
  @IsEnum(ItemType)
  item_type: ItemType;

  @ApiProperty({
    type: 'integer',
    description: 'ID of the person responsible for maintenance',
  })
  @IsInt()
  person_id: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Hour meter reading (optional)',
  })
  @IsOptional()
  @IsInt()
  hour_meter?: number;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Kilometer reading (optional)',
  })
  @IsOptional()
  @IsInt()
  km?: number;

  @ApiProperty({
    enum: MaintenanceRevisionType,
    description: 'Type of maintenance revision (Preventive or Corrective)',
  })
  @IsEnum(MaintenanceRevisionType)
  revision_type: MaintenanceRevisionType;

  @ApiProperty({ type: 'string', description: 'Summary of the maintenance' })
  @IsString()
  summary: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'Date and time of the maintenance',
  })
  @IsString()
  date_time: string;

  @ApiProperty({
    type: 'string',
    description: 'Action taken during the maintenance',
  })
  @IsString()
  action: string;
}
