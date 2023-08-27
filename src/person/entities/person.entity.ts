import { FarmEntity } from 'src/farm/entities/farm.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum PersonType {
  Administrator = 'Administrator',
  InternalCollaborator = 'InternalCollaborator',
  ExternalCollaborator = 'ExternalCollaborator',
}

@Entity({ name: 'person' })
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Male,
  })
  gender: Gender;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: PersonType,
    default: PersonType.Administrator,
  })
  person_type: PersonType;

  @ManyToOne(() => FarmEntity)
  @JoinColumn({ name: 'farmId' })
  bloodCenter: FarmEntity;
}
