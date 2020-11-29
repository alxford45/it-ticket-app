import { ApiProperty } from '@nestjs/swagger';

export class DeviceDTO {
  @ApiProperty({ description: 'id of device', example: 1 })
  device_id: number;

  @ApiProperty({ description: 'id of associated ticket', example: 1 })
  ticket_id: number;

  @ApiProperty({
    minLength: 1,
    description: 'model of device',
    example: '15',
  })
  model: string;

  @ApiProperty({
    description: 'physical hardware part that is damaged',
    example: 'screen',
    nullable: true,
    default: null,
  })
  component: string | null;

  @ApiProperty({ description: 'manufacturer of device', example: 'dell' })
  manufacturer: string;

  @ApiProperty({
    minLength: 1,
    description: 'operating system',
    example: 'windows',
  })
  operating_system: string;

  @ApiProperty({ description: 'operating system version', example: 'version1' })
  operating_system_version: string;
}
