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
    return this.schedulingRepository
      .createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.person', 'person')
      .leftJoinAndSelect('scheduling.instrument', 'instrument')
      .leftJoinAndSelect('person.farm', 'farm')
      .where('farm.id = :farmid', { farmid })
      .select([
        'scheduling.id',
        'scheduling.scheduled_date_time',
        'person.id',
        'person.name',
        'instrument.id',
        'instrument.name',
        'farm.id',
        'farm.name',
      ])
      .getMany();
  }

  async findSchedulingsByPerson(personid: number): Promise<SchedulingEntity[]> {
    return this.schedulingRepository
      .createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.person', 'person')
      .leftJoinAndSelect('scheduling.instrument', 'instrument')
      .leftJoinAndSelect('person.farm', 'farm')
      .where('person.id = :personid', { personid })
      .select([
        'scheduling.id',
        'scheduling.scheduled_date_time',
        'person.id',
        'person.name',
        'instrument.id',
        'instrument.name',
        'farm.id',
        'farm.name',
      ])
      .getMany();
  }

  async findSchedulingsByInstrument(
    instrumentid: number,
  ): Promise<SchedulingEntity[]> {
    return this.schedulingRepository
      .createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.person', 'person')
      .leftJoinAndSelect('scheduling.instrument', 'instrument')
      .where('instrument.id = :instrumentid', { instrumentid })
      .select([
        'scheduling.id',
        'scheduling.scheduled_date_time',
        'person.id',
        'person.name',
        'instrument.id',
        'instrument.name',
      ])
      .getMany();
  }

  async findAllWithDetails(): Promise<SchedulingEntity[]> {
    return this.schedulingRepository
      .createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.person', 'person')
      .leftJoinAndSelect('scheduling.instrument', 'instrument')
      .leftJoinAndSelect('person.farm', 'farm')
      .select([
        'scheduling.id',
        'scheduling.scheduled_date_time',
        'person.id',
        'person.name',
        'instrument.id',
        'instrument.name',
        'farm.id',
        'farm.name',
      ])
      .getMany();
  }

  async findOneWithDetails(id: number): Promise<SchedulingEntity> {
    const scheduling = await this.schedulingRepository
      .createQueryBuilder('scheduling')
      .leftJoinAndSelect('scheduling.person', 'person')
      .leftJoinAndSelect('scheduling.instrument', 'instrument')
      .leftJoinAndSelect('person.farm', 'farm')
      .where('scheduling.id = :id', { id })
      .select([
        'scheduling.id',
        'scheduling.scheduled_date_time',
        'person.id',
        'person.name',
        'instrument.id',
        'instrument.name',
        'farm.id',
        'farm.name',
      ])
      .getOne();

    if (!scheduling) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    return scheduling;
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
