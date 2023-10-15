// src/scheduling/scheduling.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchedulingEntity } from './entities/scheduling.entity';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';
import { UpdateSchedulingDto } from './dtos/update-scheduling.dto';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectRepository(SchedulingEntity)
    private readonly schedulingRepository: Repository<SchedulingEntity>,
  ) {}

  async create(
    createSchedulingDto: CreateSchedulingDto,
  ): Promise<SchedulingEntity> {
    const scheduling = await this.schedulingRepository.save(
      createSchedulingDto,
    );
    return scheduling;
  }

  async findSchedulingsByFarm(farmid: number): Promise<SchedulingEntity[]> {
    const query = `
      SELECT
        scheduling.id,
        scheduling.scheduled_date_time,
        person.id AS person_id,
        person.name AS person_name,
        instrument.id AS instrument_id,
        instrument.name AS instrument_name,
        farm.id AS farm_id,
        farm.name AS farm_name
      FROM scheduling
      LEFT JOIN person ON scheduling.personid = person.id
      LEFT JOIN instrument ON scheduling.instrumentid = instrument.id
      LEFT JOIN farm ON person.farmid = farm.id
      WHERE farm.id = $1
    `;

    const results = await this.schedulingRepository.query(query, [farmid]);

    return results;
  }

  async findSchedulingsByPerson(personid: number): Promise<SchedulingEntity[]> {
    const query = `
      SELECT
        scheduling.id,
        scheduling.scheduled_date_time,
        person.id AS person_id,
        person.name AS person_name,
        instrument.id AS instrument_id,
        instrument.name AS instrument_name,
        farm.id AS farm_id,
        farm.name AS farm_name
      FROM scheduling
      LEFT JOIN person ON scheduling.personid = person.id
      LEFT JOIN instrument ON scheduling.instrumentid = instrument.id
      LEFT JOIN farm ON person.farmid = farm.id
      WHERE person.id = $1
    `;

    const results = await this.schedulingRepository.query(query, [personid]);

    return results;
  }

  async findSchedulingsByInstrument(
    instrumentid: number,
  ): Promise<SchedulingEntity[]> {
    const query = `
      SELECT
        scheduling.id,
        scheduling.scheduled_date_time,
        person.id AS person_id,
        person.name AS person_name,
        instrument.id AS instrument_id,
        instrument.name AS instrument_name
      FROM scheduling
      LEFT JOIN person ON scheduling.personid = person.id
      LEFT JOIN instrument ON scheduling.instrumentid = instrument.id
      WHERE instrument.id = $1
    `;

    const results = await this.schedulingRepository.query(query, [
      instrumentid,
    ]);

    return results;
  }

  async findAllWithDetails(): Promise<SchedulingEntity[]> {
    const query = `
      SELECT
        scheduling.id,
        scheduling.scheduled_date_time,
        person.id AS person_id,
        person.name AS person_name,
        instrument.id AS instrument_id,
        instrument.name AS instrument_name,
        farm.id AS farm_id,
        farm.name AS farm_name
      FROM scheduling
      LEFT JOIN person ON scheduling.personid = person.id
      LEFT JOIN instrument ON scheduling.instrumentid = instrument.id
      LEFT JOIN farm ON person.farmid = farm.id
    `;

    const results = await this.schedulingRepository.query(query);

    return results;
  }

  async findOneWithDetails(id: number): Promise<SchedulingEntity> {
    const query = `
      SELECT
        scheduling.id,
        scheduling.scheduled_date_time,
        person.id AS person_id,
        person.name AS person_name,
        instrument.id AS instrument_id,
        instrument.name AS instrument_name,
        farm.id AS farm_id,
        farm.name AS farm_name
      FROM scheduling
      LEFT JOIN person ON scheduling.personid = person.id
      LEFT JOIN instrument ON scheduling.instrumentid = instrument.id
      LEFT JOIN farm ON person.farmid = farm.id
      WHERE scheduling.id = $1
    `;

    const scheduling = await this.schedulingRepository.query(query, [id]);

    if (!scheduling || scheduling.length === 0) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    return scheduling[0];
  }

  async update(
    id: number,
    updateSchedulingDto: UpdateSchedulingDto,
  ): Promise<SchedulingEntity> {
    const scheduling = await this.schedulingRepository.findOne({
      where: { id },
    });

    if (!scheduling) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    await this.schedulingRepository.save({
      ...scheduling,
      ...updateSchedulingDto,
    });

    return scheduling;
  }

  async remove(id: number): Promise<void> {
    const scheduling = await this.schedulingRepository.findOne({
      where: { id },
    });

    if (!scheduling) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    await this.schedulingRepository.remove(scheduling);
  }
}
