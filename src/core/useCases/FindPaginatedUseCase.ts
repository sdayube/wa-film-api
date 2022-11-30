import { inject, injectable } from 'tsyringe';

import { IFilmRepository } from '../../data/repositories/contracts/IFilmRepository';
import { Film } from '../entities/Film.entity';

@injectable()
class FindPaginatedUseCase {
  constructor(
    @inject('FilmRepository')
    private filmRepository: IFilmRepository,
  ) {}

  async execute(page: number): Promise<[Film[], number]> {
    const films = await this.filmRepository.findPaginated(page);
    return films;
  }
}

export { FindPaginatedUseCase };
