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

  async findByPersonId(personid: number): Promise<MaintenanceEntity[]> {
    return this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .where('person.id = :personid', { personid })
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

  async findByInstrumentId(instrumentid: number): Promise<MaintenanceEntity[]> {
    return this.maintenanceRepository
      .createQueryBuilder('maintenance')
      .leftJoinAndSelect('maintenance.instrument', 'instrument')
      .leftJoinAndSelect('maintenance.person', 'person')
      .where('instrument.id = :instrumentid', { instrumentid })
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

  async findByFarmId(farmid: number): Promise<MaintenanceEntity[]> {
    const query = `
      SELECT
        maintenance.id AS maintenance_id,
        maintenance.item_type,
        maintenance.hour_meter,
        maintenance.km,
        maintenance.revision_type,
        maintenance.summary,
        maintenance.date_time,
        maintenance.action,
        instrument.id AS instrument_id,
        instrument.name AS instrument_name,
        instrument.type AS instrument_type,
        person.id AS person_id,
        person.name AS person_name,
        person.gender AS person_gender,
        person.date_of_birth AS person_date_of_birth,
        person.phone AS person_phone,
        person.email AS person_email,
        person.person_type AS person_person_type
      FROM maintenance
      LEFT JOIN instrument ON maintenance.instrumentid = instrument.id
      LEFT JOIN person AS person ON maintenance.personid = person.id
      WHERE person.farmid = ?
    `;

    const results = await this.maintenanceRepository.query(query, [farmid]);

    if (!results) {
      throw new NotFoundException(
        `No maintenance records found for Farm ID ${farmid}`,
      );
    }

    return results;
  }
}
