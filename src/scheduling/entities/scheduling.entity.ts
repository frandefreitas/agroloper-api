import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PersonEntity } from 'src/person/entities/person.entity';

@Entity({ name: 'scheduling' })
export class SchedulingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PersonEntity)
  person: PersonEntity;

  @Column({ type: 'datetime' })
  scheduled_date_time: Date;

  @Column('text')
  scheduling_description: string;
}
