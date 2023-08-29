// src/scheduling/scheduling.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { CreateSchedulingDto } from './dtos/create-scheduling.dto';
import { UpdateSchedulingDto } from './dtos/update-scheduling.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('scheduling')
@ApiTags('Scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Post()
  @ApiBody({ type: CreateSchedulingDto })
  create(@Body() createSchedulingDto: CreateSchedulingDto) {
    return this.schedulingService.create(createSchedulingDto);
  }

  @Get('farm/:farmId')
  findSchedulingsByFarm(@Param('farmId') farmId: string) {
    return this.schedulingService.findSchedulingsByFarm(+farmId);
  }

  @Get('person/:personId')
  findSchedulingsByPerson(@Param('personId') personId: string) {
    return this.schedulingService.findSchedulingsByPerson(+personId);
  }

  @Get('instrument/:instrumentId')
  findSchedulingsByInstrument(@Param('instrumentId') instrumentId: string) {
    return this.schedulingService.findSchedulingsByInstrument(+instrumentId);
  }

  @Get()
  findAllWithDetails() {
    return this.schedulingService.findAllWithDetails();
  }

  @Get(':id')
  findOneWithDetails(@Param('id') id: string) {
    return this.schedulingService.findOneWithDetails(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSchedulingDto })
  update(
    @Param('id') id: string,
    @Body() updateSchedulingDto: UpdateSchedulingDto,
  ) {
    return this.schedulingService.update(+id, updateSchedulingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulingService.remove(+id);
  }
}
