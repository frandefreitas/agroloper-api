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
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('person')
@ApiTags('Person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiBody({ type: CreatePersonDto })
  async create(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<{ id: number }> {
    return await this.personService.create(createPersonDto);
  }

  @Post('admin')
  @ApiBody({ type: CreatePersonDto })
  async createAdministrator(
    @Body() createPersonDto: CreatePersonDto,
  ): Promise<{ id: number }> {
    return await this.personService.createAdministrator(createPersonDto);
  }

  @Get()
  async findAllWithFarm(): Promise<PersonEntity[]> {
    return await this.personService.findAllWithFarm();
  }

  @Get('farm/:id')
  findAllByFarm(
    @Param('id') farmid: number | undefined,
  ): Promise<PersonEntity[]> {
    return this.personService.findAllByFarm(farmid);
  }

  @Get(':id')
  async findOneWithFarm(@Param('id') id: string): Promise<PersonEntity> {
    return await this.personService.findOneWithFarm(Number(id));
  }

  @Put(':id')
  @ApiBody({ type: UpdatePersonDto })
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<PersonEntity> {
    return await this.personService.update(Number(id), updatePersonDto);
  }

  @Put(':id/status')
  @ApiBody({ type: UpdatePersonDto })
  async updateStatusToTrue(@Param('id') id: string): Promise<PersonEntity> {
    return await this.personService.updateStatusToTrue(Number(id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.personService.remove(Number(id));
  }

  @Put(':id/update-password')
  async updatePassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    try {
      await this.personService.updatePassword(id, updatePasswordDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new Error('Unable to update password.');
    }
  }
}
