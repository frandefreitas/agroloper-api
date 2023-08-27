import { IsNotEmpty, IsEnum } from 'class-validator';
import { InstrumentType } from 'src/instrument/entities/instrument.entity';

export class CreateInstrumentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(InstrumentType)
  type: string;

  @IsNotEmpty()
  farmId: number;
}
