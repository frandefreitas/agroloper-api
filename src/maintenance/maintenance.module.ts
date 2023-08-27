import { Module } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceEntity } from './entities/maintenance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceEntity])],
  controllers: [MaintenanceController],
  providers: [MaintenanceService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}
