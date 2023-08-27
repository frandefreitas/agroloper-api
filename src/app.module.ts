import { Module } from '@nestjs/common';

import { FarmModule } from './farm/farm.module';
import { PersonModule } from './person/person.module';
import { InstrumentModule } from './instrument/instrument.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'soci',
      password: 'rejkrljklklmadnk@0493409kdsjk932', //49834935fdklhi@afkl9430d
      database: 'agroloper-database-2023',
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
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
