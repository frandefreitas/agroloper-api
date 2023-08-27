import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceEntity } from './entities/maintenance.entity';
import { CreateMaintenanceDto } from './dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dtos/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(MaintenanceEntity)
    private readonly maintenanceRepository: Repository<MaintenanceEntity>,
  ) {}

  async create(
    createMaintenanceDto: CreateMaintenanceDto,
  ): Promise<MaintenanceEntity> {
    const maintenance = this.maintenanceRepository.create(createMaintenanceDto);
    return await this.maintenanceRepository.save(maintenance);
  }

  async findAll(): Promise<MaintenanceEntity[]> {
    return await this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .getMany();
  }

  async findOne(id: number): Promise<MaintenanceEntity> {
    const maintenance = await this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .where('maintenance.id = :id', { id })
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .getOne();

    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    return maintenance;
  }

  async update(
    id: number,
    updateMaintenanceDto: UpdateMaintenanceDto,
  ): Promise<MaintenanceEntity> {
    const maintenance = await this.findOne(id);
    const updatedMaintenance = Object.assign(maintenance, updateMaintenanceDto);
    return await this.maintenanceRepository.save(updatedMaintenance);
  }

  async remove(id: number): Promise<void> {
    const maintenance = await this.findOne(id);
    await this.maintenanceRepository.remove(maintenance);
  }
}
