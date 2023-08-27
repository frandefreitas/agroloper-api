import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'farm' })
export class FarmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
