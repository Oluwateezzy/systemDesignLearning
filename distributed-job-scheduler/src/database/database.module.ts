import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Job } from '../entities/job.entity';
import { JobExecution } from '../entities/job-execution.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [Job, JobExecution],
        synchronize: configService.get('app.environment') === 'development',
        logging: configService.get('app.environment') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([Job, JobExecution]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
