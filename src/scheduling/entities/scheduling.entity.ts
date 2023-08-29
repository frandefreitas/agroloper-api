import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PersonEntity } from 'src/person/entities/person.entity';
import { InstrumentEntity } from 'src/instrument/entities/instrument.entity';

@Entity({ name: 'scheduling' })
export class SchedulingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PersonEntity)
  person: PersonEntity;

  @ManyToOne(() => InstrumentEntity)
  instrument: InstrumentEntity;

  @Column({ type: 'datetime' })
  scheduled_date_time: Date;

  @Column('text')
  scheduling_description: string;
}
