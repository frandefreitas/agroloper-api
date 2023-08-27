import { Injectable } from '@nestjs/common';
import { CreateMaintenanceDto } from './dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dtos/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  create(createMaintenanceDto: CreateMaintenanceDto) {
    return 'This action adds a new maintenance';
  }

  findAll() {
    return `This action returns all maintenance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintenance`;
  }

  update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    return `This action updates a #${id} maintenance`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintenance`;
  }
}
