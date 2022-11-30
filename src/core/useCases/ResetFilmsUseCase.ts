import { inject, injectable } from 'tsyringe';

import { IResetFilmsDTO } from '../../data/DTOs/IResetFilmsDTO';
import { IFilmRepository } from '../../data/repositories/contracts/IFilmRepository';

@injectable()
class ResetFilmsUseCase {
  constructor(
    @inject('FilmRepository')
    private filmRepository: IFilmRepository,
  ) {}

  async execute(films: IResetFilmsDTO[]): Promise<void> {
    await this.filmRepository.resetFilms(films);
  }
}

export { ResetFilmsUseCase };
