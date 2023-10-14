import { Module } from '@nestjs/common';

import { FarmModule } from './farm/farm.module';
import { PersonModule } from './person/person.module';
import { InstrumentModule } from './instrument/instrument.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.31.16.0',
      port: 20,
      username: 'agroloper',
      password: 'rejkrljklklmadnk.0493409kdsjk932',
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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// type: 'mysql',
// host: 'localhost',
// port: 3306,
// username: 'soci',
// password: 'rejkrljklklmadnk@0493409kdsjk932',
// database: 'agroloper-database-2023',
// entities: [`${__dirname}/**/*.entity{.js,.ts}`],
// migrations: [`${__dirname}/migration/{.ts,*.js}`],
// migrationsRun: true,
