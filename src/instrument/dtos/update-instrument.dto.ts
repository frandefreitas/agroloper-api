import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { InstrumentType } from 'src/instrument/entities/instrument.entity';

export class UpdateInstrumentDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsEnum(InstrumentType)
  type: string;

  @IsOptional()
  farmId: number;
}
