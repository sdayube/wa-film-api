import { IResetFilmsDTO } from '../../DTOs/IResetFilmsDTO';
import { Film } from '../../../core/entities/Film.entity';

export interface IFilmRepository {
  resetFilms(films: IResetFilmsDTO[]): Promise<void>;
  findPaginated(page: number): Promise<[Film[], number]>;
}
