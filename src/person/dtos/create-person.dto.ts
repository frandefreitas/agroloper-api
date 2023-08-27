import { IsNotEmpty, IsEnum } from 'class-validator';
import { Gender, PersonType } from '../entities/person.entity';

export class CreatePersonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  date_of_birth: Date;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  email: string;

  @IsEnum(PersonType)
  @IsNotEmpty()
  person_type: PersonType;

  farm_id: number;
}
