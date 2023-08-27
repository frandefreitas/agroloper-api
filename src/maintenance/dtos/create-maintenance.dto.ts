import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import {
  MaintenanceRevisionType,
  ItemType,
} from '../entities/maintenance.entity';

export class CreateMaintenanceDto {
  @IsInt()
  item_id: number;

  @IsEnum(ItemType)
  item_type: ItemType;

  @IsInt()
  person_id: number;

  @IsOptional()
  @IsInt()
  hour_meter?: number;

  @IsOptional()
  @IsInt()
  km?: number;

  @IsEnum(MaintenanceRevisionType)
  revision_type: MaintenanceRevisionType;

  @IsString()
  summary: string;

  @IsString()
  date_time: string;

  @IsString()
  action: string;
}
