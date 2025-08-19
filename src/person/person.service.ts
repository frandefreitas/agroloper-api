import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async create(createPersonDto: CreatePersonDto): Promise<{ id: number }> {
    if (createPersonDto.person_type === 'Administrator') {
      throw new NotFoundException(
        `Person cannot be created with this type of profile.`,
      );
    }

    const person = this.personRepository.create({
      ...createPersonDto,
      password: await this.hashPassword(createPersonDto.password),
    });
    const created = await this.personRepository.save(person);
    return { id: created.id };
  }

  async createAdministrator(
    createPersonDto: CreatePersonDto,
  ): Promise<{ id: number }> {
    if (createPersonDto.person_type !== 'Administrator') {
      throw new NotFoundException(
        'This method is for creating Administrator only.',
      );
    }

    const person = this.personRepository.create({
      ...createPersonDto,
      password: await this.hashPassword(createPersonDto.password),
    });

    const created = await this.personRepository.save(person);
    return { id: created.id };
  }

  async findOneByEmail(email: string): Promise<PersonEntity> {
    const person = await this.personRepository.findOne({ where: { email } });

    if (!person) {
      throw new NotFoundException('User not found');
    }

    return person;
  }

  async findOneByEmailWithFarm(
    authenticatedUserEmail: string,
  ): Promise<PersonEntity> {
    const person = await this.personRepository
      .createQueryBuilder('person')
      .where('person.email = :email', { email: authenticatedUserEmail })
      .leftJoinAndSelect('person.farm', 'farm')
      .getOne();

    if (!person) {
      throw new NotFoundException('User not found');
    }

    return person;
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
        'person.status',
        'farm.id',
        'farm.name',
        'farm.description',
        'farm.city',
        'farm.state',
      ])
      .getMany();
  }

  async findAllByFarm(farmid: number | undefined): Promise<PersonEntity[]> {
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
        'person.status',
        'farm.id',
        'farm.name',
        'farm.description',
        'farm.city',
        'farm.state',
      ]);

    if (farmid !== undefined) {
      queryBuilder.where('farm.id = :farmid', { farmid });
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
        'person.status',
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

  async updateStatusToTrue(
    id: number,
    userToken: string,
  ): Promise<PersonEntity> {
    const canRemove = await this.authService.canUserRemoveInstrument(userToken);

    if (!canRemove) {
      throw new UnauthorizedException(
        `User does not have permission to remove instruments.`,
      );
    }

    const person = await this.findOneWithFarm(id);

    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    person.status = true;

    return await this.personRepository.save(person);
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

    const isCurrentPasswordValid = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      person.password,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect.');
    }

    const hashedNewPassword = await this.hashPassword(
      updatePasswordDto.newPassword,
    );
    await this.personRepository.update(id, { password: hashedNewPassword });
  }
}
