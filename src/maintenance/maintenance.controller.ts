import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dtos/update-maintenance.dto';
import { MaintenanceEntity } from './entities/maintenance.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('maintenance')
@ApiTags('Maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  findAll(): Promise<MaintenanceEntity[]> {
    return this.maintenanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<MaintenanceEntity> {
    return this.maintenanceService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateMaintenanceDto })
  create(@Body() createMaintenanceDto: CreateMaintenanceDto): Promise<number> {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateMaintenanceDto })
  update(
    @Param('id') id: number,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ): Promise<number> {
    return this.maintenanceService.update(id, updateMaintenanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.maintenanceService.remove(id);
  }

  @Get('person/:personid')
  findByPersonId(
    @Param('personid') personid: number,
  ): Promise<MaintenanceEntity[]> {
    return this.maintenanceService.findByPersonId(personid);
  }

  @Get('instrument/:instrumentid')
  findByInstrumentId(
    @Param('instrumentid') instrumentid: number,
  ): Promise<MaintenanceEntity[]> {
    return this.maintenanceService.findByInstrumentId(instrumentid);
  }

  @Get('farm/:farmid')
  findByFarmId(@Param('farmid') farmid: number): Promise<MaintenanceEntity[]> {
    return this.maintenanceService.findByFarmId(farmid);
  }
}
