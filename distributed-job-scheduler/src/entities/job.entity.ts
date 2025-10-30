import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobExecution } from './job-execution.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 100 })
  schedule: string;

  @Column({ length: 500 })
  endpoint: string;

  @Column('jsonb', { nullable: true })
  payload: any;

  @Column({ type: 'timestamp', name: 'next_run_at' })
  nextRunAt: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'paused', 'deleted'],
    default: 'active',
  })
  status: 'active' | 'paused' | 'deleted';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => JobExecution, (execution) => execution.job)
  executions: JobExecution[];

  constructor(partial?: Partial<Job>) {
    Object.assign(this, partial);
  }
}
