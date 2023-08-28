import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import * as crypto from 'crypto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha1').update(password).digest('hex');
  }

  async create(createPersonDto: CreatePersonDto): Promise<{ id: number }> {
    const person = this.personRepository.create({
      ...createPersonDto,
      password: this.hashPassword(createPersonDto.password),
    });
    const created = await this.personRepository.save(person);
    return { id: created.id };
  }

  async findAllWithFarm(): Promise<PersonEntity[]> {
    return await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.farm', 'farm')
      .select([
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
        'farm.id',
        'farm.name',
        'farm.description',
        'farm.city',
        'farm.state',
      ])
      .getMany();
  }

  async findAllByFarm(farmId: number | undefined): Promise<PersonEntity[]> {
    const queryBuilder = this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.farm', 'farm')
      .select([
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
        'farm.id',
        'farm.name',
        'farm.description',
        'farm.city',
        'farm.state',
      ]);

    if (farmId !== undefined) {
      queryBuilder.where('farm.id = :farmId', { farmId });
    }

    return await queryBuilder.getMany();
  }

  async findOneWithFarm(id: number): Promise<PersonEntity> {
    const person = await this.personRepository
      .createQueryBuilder('person')
      .where('person.id = :id', { id })
      .leftJoinAndSelect('person.farm', 'farm')
      .select([
        'person.id',
        'person.name',
        'person.gender',
        'person.date_of_birth',
        'person.phone',
        'person.email',
        'person.person_type',
        'farm.id',
        'farm.name',
        'farm.description',
        'farm.city',
        'farm.state',
      ])
      .getOne();

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    return person;
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    const person = await this.findOneWithFarm(id);
    const updatedPerson = Object.assign(person, updatePersonDto);
    return await this.personRepository.save(updatedPerson);
  }

  async remove(id: number): Promise<void> {
    const person = await this.findOneWithFarm(id);
    await this.personRepository.remove(person);
  }

  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    const currentPasswordHashed = crypto
      .createHash('sha1')
      .update(updatePasswordDto.currentPassword)
      .digest('hex');

    if (currentPasswordHashed !== person.password) {
      throw new Error('Current password is incorrect.');
    }

    const hashedNewPassword = this.hashPassword(updatePasswordDto.newPassword);
    await this.personRepository.update(id, { password: hashedNewPassword });
  }
}
