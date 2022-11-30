import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  url: process.env.DATABASE_URL,
  ssl: process.env.SSL_ENABLED === 'true',
  type: 'postgres',
  database: 'film',
  entities: ['src/core/entities/*.ts'],
  migrations: ['src/data/migrations/*.ts'],
  logging: true,
  synchronize: true,
});
