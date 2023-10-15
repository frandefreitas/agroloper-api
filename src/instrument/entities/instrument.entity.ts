import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FarmEntity } from 'src/farm/entities/farm.entity';

export enum InstrumentType {
  Instrument = 'Instrument',
  Machine = 'Machine',
}

@Entity({ name: 'instrument' })
export class InstrumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ enum: ['Instrument', 'Machine'], default: 'Instrument' })
  type: string;

  @ManyToOne(() => FarmEntity)
  @JoinColumn({ name: 'farmid' })
  farm: FarmEntity;
}
