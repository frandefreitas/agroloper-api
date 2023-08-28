import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dtos/update-maintenance.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('maintenance')
@ApiTags('Maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @ApiBody({ type: CreateMaintenanceDto })
  create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateMaintenanceDto })
  update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    return this.maintenanceService.update(+id, updateMaintenanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(+id);
  }
}
