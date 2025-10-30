export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'job_scheduler',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
    password: '',
    db: 0,
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    queue: process.env.RABBITMQ_QUEUE || 'job_execution_queue',
    exchange: process.env.RABBITMQ_EXCHANGE || 'job_exchange',
  },
  app: {
    port: 3000,
    environment: process.env.NODE_ENV || 'development',
  },
});
