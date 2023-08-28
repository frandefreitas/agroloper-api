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

  async create(createMaintenanceDto: CreateMaintenanceDto): Promise<number> {
    const maintenance = this.maintenanceRepository.create(createMaintenanceDto);
    const savedMaintenance = await this.maintenanceRepository.save(maintenance);
    return savedMaintenance.id;
  }

  async findAll(): Promise<MaintenanceEntity[]> {
    return this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .select([
        'maintenance.id',
        'maintenance.item_type',
        'maintenance.hour_meter',
        'maintenance.km',
        'maintenance.revision_type',
        'maintenance.summary',
        'maintenance.date_time',
        'maintenance.action',
        'instrument.id',
        'instrument.name',
        'instrument.type',
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
      ])
      .getMany();
  }

  async findOne(id: number): Promise<MaintenanceEntity> {
    const maintenance = await this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .where('maintenance.id = :id', { id })
      .select([
        'maintenance.id',
        'maintenance.item_type',
        'maintenance.hour_meter',
        'maintenance.km',
        'maintenance.revision_type',
        'maintenance.summary',
        'maintenance.date_time',
        'maintenance.action',
        'instrument.id',
        'instrument.name',
        'instrument.type',
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
      ])
      .getOne();

    if (!maintenance) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    return maintenance;
  }

  async update(
    id: number,
    updateMaintenanceDto: UpdateMaintenanceDto,
  ): Promise<number> {
    await this.findOne(id);

    await this.maintenanceRepository.update(id, updateMaintenanceDto);
    return id;
  }

  async remove(id: number): Promise<void> {
    const maintenance = await this.findOne(id);

    await this.maintenanceRepository.remove(maintenance);
  }

  async findByPersonId(personId: number): Promise<MaintenanceEntity[]> {
    return this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .where('person.id = :personId', { personId })
      .select([
        'maintenance.id',
        'maintenance.item_type',
        'maintenance.hour_meter',
        'maintenance.km',
        'maintenance.revision_type',
        'maintenance.summary',
        'maintenance.date_time',
        'maintenance.action',
        'instrument.id',
        'instrument.name',
        'instrument.type',
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
      ])
      .getMany();
  }

  async findByInstrumentId(instrumentId: number): Promise<MaintenanceEntity[]> {
    return this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .where('instrument.id = :instrumentId', { instrumentId })
      .select([
        'maintenance.id',
        'maintenance.item_type',
        'maintenance.hour_meter',
        'maintenance.km',
        'maintenance.revision_type',
        'maintenance.summary',
        'maintenance.date_time',
        'maintenance.action',
        'instrument.id',
        'instrument.name',
        'instrument.type',
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
      ])
      .getMany();
  }

  async findByFarmId(farmId: number): Promise<MaintenanceEntity[]> {
    return this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoin('instrument.farm', 'farm')
      .leftJoinAndSelect('maintenance.person', 'person')
      .where('farm.id = :farmId', { farmId })
      .select([
        'maintenance.id',
        'maintenance.item_type',
        'maintenance.hour_meter',
        'maintenance.km',
        'maintenance.revision_type',
        'maintenance.summary',
        'maintenance.date_time',
        'maintenance.action',
        'instrument.id',
        'instrument.name',
        'instrument.type',
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
      ])
      .getMany();
  }
}
