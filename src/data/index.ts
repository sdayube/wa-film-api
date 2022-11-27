import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'films',
  entities: ['src/core/entities/*.ts'],
  migrations: ['src/data/migrations/*.ts'],
  logging: true,
  synchronize: true,
});
