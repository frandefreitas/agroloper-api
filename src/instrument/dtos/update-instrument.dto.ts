import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { InstrumentType } from 'src/instrument/entities/instrument.entity';

export class UpdateInstrumentDto {
  @ApiProperty({ description: 'Name of the instrument', required: false })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Description of the instrument',
    required: false,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Type of the instrument (Instrument/Machine)',
    enum: InstrumentType,
    enumName: 'InstrumentType',
    required: false,
  })
  @IsOptional()
  @IsEnum(InstrumentType)
  type: string;

  @ApiProperty({
    description: 'ID of the farm to which the instrument belongs',
    required: false,
    name: 'farm',
  })
  @IsOptional()
  farmId: number;
}
