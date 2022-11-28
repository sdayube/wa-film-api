import { Repository } from 'typeorm';
import { dataSource } from '..';

import { Film } from '../../core/entities/Film.entity';

export default class FilmRepository {
  private repository: Repository<Film>;

  constructor() {
    this.repository = dataSource.getRepository(Film);
  }

  async resetFilms(films: Film[]): Promise<void> {
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
