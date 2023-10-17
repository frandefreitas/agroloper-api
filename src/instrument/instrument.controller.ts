import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dtos/create-instrument.dto';
import { UpdateInstrumentDto } from './dtos/update-instrument.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
// import { Roles } from '../auth/roles.decorator';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';

@Controller('instrument')
//@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Post()
  @ApiBody({ type: CreateInstrumentDto })
  async create(
    @Body() createInstrumentDto: CreateInstrumentDto,
  ): Promise<number> {
    return this.instrumentService.create(createInstrumentDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.instrumentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<any> {
    return this.instrumentService.findOne(id);
  }

  @Get('farm/:farmid')
  async findAllByFarm(@Param('farmid') farmid: number): Promise<any[]> {
    return this.instrumentService.findAllByFarm(farmid);
  }

  @Put(':id')
  @ApiBody({ type: UpdateInstrumentDto })
  async update(
    @Param('id') id: number,
    @Body() updateInstrumentDto: UpdateInstrumentDto,
  ): Promise<number> {
    return this.instrumentService.update(id, updateInstrumentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const authHeader = (request.headers as any).authorization;
    const userToken = authHeader && authHeader.split(' ')[1];

    if (!userToken) {
      throw new UnauthorizedException('No token provided.');
    }

    return await this.instrumentService.remove(+id, userToken);
  }
}
