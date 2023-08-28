import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dtos/create-farm.dto';
import { UpdateFarmDto } from './dtos/update-farm.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('farm')
@ApiTags('Farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  @ApiBody({ type: CreateFarmDto })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmService.create(createFarmDto);
  }

  @Get()
  findAll() {
    return this.farmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(+id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateFarmDto })
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmService.remove(+id);
  }
}
