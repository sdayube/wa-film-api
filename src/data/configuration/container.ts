import { container } from 'tsyringe';

import { IFilmRepository } from '../repositories/contracts/IFilmRepository';
import { FilmRepository } from '../repositories/FilmRepository';

container.registerSingleton<IFilmRepository>('FilmRepository', FilmRepository);
