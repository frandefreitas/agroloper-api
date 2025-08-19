import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmEntity } from './entities/farm.entity';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { UpdateFarmDto } from './dtos/update-farm.dto';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmRepository: Repository<FarmEntity>,
  ) {}

  async create(createFarmDto: CreateFarmDto): Promise<FarmEntity> {
    const farm = this.farmRepository.create(createFarmDto);
    return this.farmRepository.save(farm);
  }

  async findAll(): Promise<FarmEntity[]> {
    return this.farmRepository.find();
  }

  async findOne(id: number): Promise<FarmEntity> {
    const farm = await this.farmRepository.findOne({ where: { id } });
    if (!farm) {
      throw new NotFoundException('Farm not found');
    }
    return farm;
  }

  async update(id: number, updateFarmDto: UpdateFarmDto): Promise<FarmEntity> {
    const farm = await this.findOne(id);
    this.farmRepository.merge(farm, updateFarmDto);
    return this.farmRepository.save(farm);
  }

  async remove(id: number): Promise<void> {
    const farm = await this.findOne(id);
    await this.farmRepository.remove(farm);
  }
}
