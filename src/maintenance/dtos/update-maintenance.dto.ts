import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import {
  MaintenanceRevisionType,
  ItemType,
} from '../entities/maintenance.entity';

export class UpdateMaintenanceDto {
  @ApiProperty({
    enum: ItemType,
    required: false,
    description: 'Type of the item (Instrument or Machine)',
  })
  @IsOptional()
  @IsEnum(ItemType)
  item_type?: ItemType;

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
    required: false,
    description: 'Type of maintenance revision (Preventive or Corrective)',
  })
  @IsOptional()
  @IsEnum(MaintenanceRevisionType)
  revision_type?: MaintenanceRevisionType;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Summary of the maintenance (optional)',
  })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    description: 'Date and time of the maintenance (optional)',
  })
  @IsOptional()
  @IsString()
  date_time?: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: 'Action taken during the maintenance (optional)',
  })
  @IsOptional()
  @IsString()
  action?: string;
}
