import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { InstrumentType } from 'src/instrument/entities/instrument.entity';

export class CreateInstrumentDto {
  @ApiProperty({ description: 'Name of the instrument', required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the instrument', required: true })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Type of the instrument (Instrument/Machine)',
    enum: InstrumentType,
    enumName: 'InstrumentType',
    required: true,
  })
  @IsEnum(InstrumentType)
  type: string;

  @ApiProperty({
    name: 'farm',
    description: 'ID of the farm to which the instrument belongs',
    required: true,
  })
  @IsNotEmpty()
  farmid: number;
}
