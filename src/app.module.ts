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
      host: 'localhost',
      port: 5432,
      username: 'agroloper',
      password: 'kfd0f9d0fdguj4uj3kj.m4k3m',
      database: 'agroloper',
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
