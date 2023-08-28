import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentEntity } from './entities/instrument.entity';
import { CreateInstrumentDto } from './dtos/create-instrument.dto';
import { UpdateInstrumentDto } from './dtos/update-instrument.dto';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectRepository(InstrumentEntity)
    private readonly instrumentRepository: Repository<InstrumentEntity>,
  ) {}

  async create(createInstrumentDto: CreateInstrumentDto): Promise<number> {
    const instrument = this.instrumentRepository.create(createInstrumentDto);
    const savedInstrument = await this.instrumentRepository.save(instrument);
    return savedInstrument.id;
  }

  async findAll(): Promise<InstrumentEntity[]> {
    return this.instrumentRepository
      .createQueryBuilder('instrument')
      .leftJoin('instrument.farm', 'farm')
      .select([
        'instrument.id',
        'instrument.name',
        'instrument.description',
        'instrument.type',
        'farm.name',
        'farm.id',
      ])
      .getRawMany();
  }

  async findAllByFarm(farmId: number): Promise<InstrumentEntity[]> {
    const instruments = await this.instrumentRepository
      .createQueryBuilder('instrument')
      .leftJoin('instrument.farm', 'farm')
      .where('farm.id = :farmId', { farmId })
      .select([
        'instrument.id',
        'instrument.name',
        'instrument.description',
        'instrument.type',
        'farm.name',
        'farm.id',
      ])
      .getRawMany();

    return instruments;
  }

  async findOne(id: number): Promise<InstrumentEntity> {
    const instrument = await this.instrumentRepository
      .createQueryBuilder('instrument')
      .leftJoin('instrument.farm', 'farm')
      .where('instrument.id = :id', { id })
      .select([
        'instrument.id',
        'instrument.name',
        'instrument.description',
        'instrument.type',
        'farm.name',
        'farm.id',
      ])
      .getRawOne();

    if (!instrument) {
      throw new NotFoundException(`Instrument with ID ${id} not found`);
    }

    return instrument;
  }

  async update(
    id: number,
    updateInstrumentDto: UpdateInstrumentDto,
  ): Promise<number> {
    await this.findOne(id);

    await this.instrumentRepository.update(id, updateInstrumentDto);
    return id;
  }

  async remove(id: number): Promise<void> {
    const instrument = await this.instrumentRepository.findOne({
      where: { id },
    });
    if (!instrument) {
      throw new NotFoundException(`Instrument with ID ${id} not found`);
    }

    await this.instrumentRepository.remove(instrument);
  }
}
