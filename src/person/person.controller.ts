import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonEntity } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<PersonEntity> {
    return await this.personService.create(createPersonDto);
  }

  @Get()
  async findAllWithFarm(): Promise<PersonEntity[]> {
    return await this.personService.findAllWithFarm();
  }

  @Get(':id')
  async findOneWithFarm(@Param('id') id: string): Promise<PersonEntity> {
    return await this.personService.findOneWithFarm(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    return await this.personService.update(Number(id), updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.personService.remove(Number(id));
  }

  @Put(':id/update-password')
  async updatePassword(
    @Param('id') id: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    const result = await this.personService.updatePassword(
      Number(id),
      newPassword,
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
  }
}
