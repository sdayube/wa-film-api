import { inject, injectable } from 'tsyringe';

import { IFilmRepository } from '../../data/repositories/contracts/IFilmRepository';
import { Film } from '../entities/Film.entity';

@injectable()
class FindPaginatedUseCase {
  constructor(
    @inject('FilmRepository')
    private usersRepository: IFilmRepository,
  ) {}

  async execute(page: number): Promise<[Film[], number]> {
    const films = await this.usersRepository.findPaginated(page);
    return films;
  }
}

export { FindPaginatedUseCase };
