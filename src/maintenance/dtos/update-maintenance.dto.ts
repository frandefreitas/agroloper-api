import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import {
  MaintenanceRevisionType,
  ItemType,
} from '../entities/maintenance.entity';

export class UpdateMaintenanceDto {
  @IsEnum(ItemType)
  item_type: ItemType;

  @IsOptional()
  @IsInt()
  hour_meter?: number;

  @IsOptional()
  @IsInt()
  km?: number;

  @IsOptional()
  @IsEnum(MaintenanceRevisionType)
  revision_type?: MaintenanceRevisionType;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  date_time?: string;

  @IsOptional()
  @IsString()
  action?: string;
}
