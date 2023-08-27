import { Column } from 'typeorm';

export class UpdateFarmDto {
  @Column({ nullable: true })
  name?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  state?: string;
}
