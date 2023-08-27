import { Module } from '@nestjs/common';

import { FarmModule } from './farm/farm.module';
import { PersonModule } from './person/person.module';
import { InstrumentModule } from './instrument/instrument.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [
    FarmModule,
    PersonModule,
    InstrumentModule,
    MaintenanceModule,
    SchedulingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
