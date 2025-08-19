import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateFarmDto {
  @ApiProperty({ description: 'Name of the farm' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Description of the farm' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'City of the farm' })
  @Column()
  city: string;

  @ApiProperty({ description: 'State of the farm' })
  @Column()
  state: string;
}
