import { Film } from '../../core/entities/Film.entity';

import { IResetFilmsDTO } from '../DTOs/IResetFilmsDTO';
import { IFilmRepository } from './contracts/IFilmRepository';

class InMemoryFilmRepository implements IFilmRepository {
  films: Film[] = [];

  async resetFilms(films: IResetFilmsDTO[]): Promise<void> {
    const newFilms = [] as Film[];

    films.forEach((film) => {
      const newFilm = Object.assign(new Film(), film);
      newFilms.push(newFilm);
    });

    this.films = newFilms;
  }

  async findPaginated(page: number): Promise<[Film[], number]> {
    const films = this.films.slice((page - 1) * 10, page * 10);

    return [films, this.films.length];
  }
}

export { InMemoryFilmRepository };
