import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Gender, PersonType } from '../entities/person.entity';

export class UpdatePersonDto {
  @ApiProperty({ required: false, description: 'Updated name of the user' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    enum: Gender,
    required: false,
    description: 'Updated gender of the user',
  })
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    type: 'string',
    format: 'date',
    required: false,
    description: 'Updated date of birth of the user',
  })
  @IsOptional()
  date_of_birth?: Date;

  @ApiProperty({
    required: false,
    description: 'Updated phone number of the user',
  })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    required: false,
    description: 'Updated email address of the user',
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    enum: PersonType,
    required: false,
    description: 'Updated person type of the user',
  })
  @IsEnum(PersonType)
  @IsOptional()
  person_type?: PersonType;

  @ApiProperty({
    type: 'integer',
    required: false,
    description: 'Updated farm ID associated with the user',
    name: 'farm',
  })
  @IsOptional()
  farm_id?: number;

  @IsOptional()
  status?: boolean;
}
