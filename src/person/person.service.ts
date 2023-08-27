import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';
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

  async create(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    const person = this.personRepository.create({
      ...createPersonDto,
      password: this.hashPassword(createPersonDto.password),
    });
    return await this.personRepository.save(person);
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
        'farm.name as farm_name',
        'farm.description as farm_description',
        'farm.city as farm_city',
        'farm.state as farm_state',
      ])
      .getMany();
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
        'farm.name as farm_name',
        'farm.description as farm_description',
        'farm.city as farm_city',
        'farm.state as farm_state',
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

  async updatePassword(id: number, newPassword: string): Promise<UpdateResult> {
    const hashedPassword = this.hashPassword(newPassword);
    return await this.personRepository.update(id, { password: hashedPassword });
  }
}
