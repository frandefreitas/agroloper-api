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
      LEFT JOIN person ON maintenance.personid = person.id
    `;

    const results = await this.maintenanceRepository.query(query);

    return results;
  }

  async findOne(id: number): Promise<MaintenanceEntity> {
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
      LEFT JOIN person ON maintenance.personid = person.id
      WHERE maintenance.id = $1
    `;

    const maintenance = await this.maintenanceRepository.query(query, [id]);

    if (!maintenance || maintenance.length === 0) {
      throw new NotFoundException(`Maintenance with ID ${id} not found`);
    }

    return maintenance[0];
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
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
    });

    if (!maintenance) {
      throw new Error(`Manutenção com ID ${id} não encontrada`);
    }

    await this.maintenanceRepository.delete(id);
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
      LEFT JOIN person ON maintenance.personid = person.id
      WHERE person.farmid = $1
    `;

    const results = await this.maintenanceRepository.query(query, [farmid]);

    if (!results || results.length === 0) {
      throw new NotFoundException(
        `No maintenance records found for Farm ID ${farmid}`,
      );
    }

    return results;
  }

  async findByPersonId(personid: number): Promise<MaintenanceEntity[]> {
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
      LEFT JOIN person ON maintenance.personid = person.id
      WHERE person.id = $1
    `;

    const results = await this.maintenanceRepository.query(query, [personid]);

    if (!results || results.length === 0) {
      throw new NotFoundException(
        `No maintenance records found for Person ID ${personid}`,
      );
    }

    return results;
  }

  async findByInstrumentId(instrumentid: number): Promise<MaintenanceEntity[]> {
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
      LEFT JOIN person ON maintenance.personid = person.id
      WHERE maintenance.instrumentid = $1
    `;

    const results = await this.maintenanceRepository.query(query, [
      instrumentid,
    ]);

    if (!results || results.length === 0) {
      throw new NotFoundException(
        `No maintenance records found for Instrument ID ${instrumentid}`,
      );
    }

    return results;
  }
}
