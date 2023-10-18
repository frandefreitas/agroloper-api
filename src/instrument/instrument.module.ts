import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentEntity } from './entities/instrument.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([InstrumentEntity])],
  controllers: [InstrumentController],
  providers: [InstrumentService],
  exports: [InstrumentService],
})
export class InstrumentModule {}
