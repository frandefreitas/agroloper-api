import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Gender, PersonType } from '../entities/person.entity';

export class UpdatePersonDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  gender?: Gender;

  @IsOptional()
  date_of_birth?: Date;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  email?: string;

  @IsEnum(PersonType)
  @IsOptional()
  person_type?: PersonType;

  @IsOptional()
  farm_id?: number;
}
