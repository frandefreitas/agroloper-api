import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PersonEntity } from 'src/person/entities/person.entity';
import { InstrumentEntity } from 'src/instrument/entities/instrument.entity';

@Entity({ name: 'scheduling' })
export class SchedulingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PersonEntity)
  @JoinColumn({ name: 'personid' })
  person: PersonEntity;

  @ManyToOne(() => InstrumentEntity)
  @JoinColumn({ name: 'instrumentid' })
  instrument: InstrumentEntity;

  @Column({ type: 'timestamp' })
  scheduled_date_time: Date;

  @Column('text')
  scheduling_description: string;
}
