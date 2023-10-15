import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PersonEntity } from 'src/person/entities/person.entity';
import { InstrumentEntity } from 'src/instrument/entities/instrument.entity';

export enum ItemType {
  Instrument = 'Instrument',
  Machine = 'Machine',
}

export enum MaintenanceRevisionType {
  Preventive = 'Preventive',
  Corrective = 'Corrective',
}

@Entity({ name: 'maintenance' })
export class MaintenanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => InstrumentEntity)
  instrument: InstrumentEntity;

  @Column({ enum: ['Instrument', 'Machine'] })
  item_type: string;

  @ManyToOne(() => PersonEntity)
  person: PersonEntity;

  @Column({ nullable: true })
  hour_meter: number;

  @Column({ nullable: true })
  km: number;

  @Column({ enum: ['Preventive', 'Corrective'] })
  revision_type: string;

  @Column('text')
  summary: string;

  @Column({ type: 'timestamp' })
  date_time: Date;

  @Column('text')
  action: string;
}
