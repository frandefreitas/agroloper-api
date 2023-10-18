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
      type: 'postgres',
      host: 'dpg-cko2a5mjmi5c73bp2mn0-a',
      port: 5432,
      username: 'agroloper_zvzr_user',
      password: 'EmYDMX6u37wzRAUusrucFDPIxJKSA5gk',
      database: 'agroloper_zvzr',
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
