import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'film',
  entities: ['src/core/entities/*.ts'],
  migrations: ['src/data/migrations/*.ts'],
  logging: true,
  synchronize: true,
});
