import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Gender, PersonType } from '../entities/person.entity';

export class CreatePersonDto {
  @ApiProperty({ description: 'Name of the person' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Gender of the person (Male/Female)',
    enum: Gender,
    enumName: 'Gender',
  })
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ description: 'Date of birth of the person' })
  @IsNotEmpty()
  date_of_birth: Date;

  @ApiProperty({ description: 'Password for the person' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Phone number of the person' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Email address of the person' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'Type of the person (Administrator/InternalCollaborator/ExternalCollaborator)',
    enum: PersonType,
    enumName: 'PersonType',
  })
  @IsEnum(PersonType)
  @IsNotEmpty()
  person_type: PersonType;

  @ApiProperty({
    name: 'farm',
    description: 'ID of the farm to which the person belongs',
  })
  @IsOptional()
  farm_id: number;

  @IsOptional()
  status?: boolean;
}
