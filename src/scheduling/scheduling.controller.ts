// src/scheduling/scheduling.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
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

  @Get('farm/:farmid')
  findSchedulingsByFarm(@Param('farmid') farmid: string) {
    return this.schedulingService.findSchedulingsByFarm(+farmid);
  }

  @Get('person/:personid')
  findSchedulingsByPerson(@Param('personid') personid: string) {
    return this.schedulingService.findSchedulingsByPerson(+personid);
  }

  @Get('instrument/:instrumentid')
  findSchedulingsByInstrument(@Param('instrumentid') instrumentid: string) {
    return this.schedulingService.findSchedulingsByInstrument(+instrumentid);
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
  async remove(@Param('id') id: string, @Req() request: Request) {
    const authHeader = (request.headers as any).authorization;
    const userToken = authHeader && authHeader.split(' ')[1];

    if (!userToken) {
      throw new UnauthorizedException('No token provided.');
    }

    return await this.schedulingService.remove(+id, userToken);
  }
}
