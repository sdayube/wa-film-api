import { inject, injectable } from 'tsyringe';

import { IResetFilmsDTO } from '../../data/DTOs/IResetFilmsDTO';
import { IFilmRepository } from '../../data/repositories/contracts/IFilmRepository';

@injectable()
class ResetFilmsUseCase {
  constructor(
    @inject('FilmRepository')
    private usersRepository: IFilmRepository,
  ) {}

  async execute(films: IResetFilmsDTO[]): Promise<void> {
    await this.usersRepository.resetFilms(films);
  }
}

export { ResetFilmsUseCase };
