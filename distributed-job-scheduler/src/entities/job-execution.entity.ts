import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Job } from './job.entity';

@Entity('job_executions')
export class JobExecution {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.executions)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ name: 'job_id' })
  jobId: number;

  @CreateDateColumn({ name: 'executed_at' })
  executedAt: Date;

  @Column({
    type: 'enum',
    enum: ['success', 'failed', 'running'],
    default: 'running',
  })
  status: 'success' | 'failed' | 'running';

  @Column('text', { nullable: true })
  response: string;

  @Column('text', { nullable: true, name: 'error_message' })
  errorMessage: string;

  @Column({ type: 'int', nullable: true, name: 'status_code' })
  statusCode: number;

  @Column({ type: 'float', nullable: true, name: 'response_time_ms' })
  responseTimeMs: number;

  constructor(partial?: Partial<JobExecution>) {
    Object.assign(this, partial);
  }
}
