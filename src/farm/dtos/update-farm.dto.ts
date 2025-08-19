import { ApiProperty } from '@nestjs/swagger';

export class UpdateFarmDto {
  @ApiProperty({ description: 'Name of the farm (optional)', required: false })
  name?: string;

  @ApiProperty({
    description: 'Description of the farm (optional)',
    required: false,
  })
  description?: string;

  @ApiProperty({ description: 'City of the farm (optional)', required: false })
  city?: string;

  @ApiProperty({ description: 'State of the farm (optional)', required: false })
  state?: string;
}
