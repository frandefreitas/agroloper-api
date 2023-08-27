import { Column } from 'typeorm';

export class CreateFarmDto {
  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
