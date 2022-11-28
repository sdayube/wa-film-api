import { Repository } from 'typeorm';
import { dataSource } from '..';

import { IResetFilmsDTO } from '../DTOs/IResetFilmsDTO';
import { IFilmRepository } from './contracts/IFilmRepository';

import { Film } from '../../core/entities/Film.entity';

export class FilmRepository implements IFilmRepository {
  private repository: Repository<Film>;

  constructor() {
    this.repository = dataSource.getRepository(Film);
  }

  async resetFilms(films: IResetFilmsDTO[]): Promise<void> {
    await this.repository.clear();
    await this.repository.save(films);
  }

  async findPaginated(page: number): Promise<[Film[], number]> {
    console.log('page', page);
    return this.repository.findAndCount({
      take: 10,
      skip: (page - 1) * 10,
    });
  }
}
