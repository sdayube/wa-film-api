import { InMemoryFilmRepository } from '../src/data/repositories/InMemFilmRepository';

import { FindPaginatedUseCase } from '../src/core/useCases/FindPaginatedUseCase';

let findPaginatedUseCase: FindPaginatedUseCase;
let inMemoryFilmRepository: InMemoryFilmRepository;

describe('Reset Films', () => {
  beforeEach(() => {
    inMemoryFilmRepository = new InMemoryFilmRepository();
    findPaginatedUseCase = new FindPaginatedUseCase(inMemoryFilmRepository);
  });

  it('should be able to get paginated films', async () => {
    const film = {
      title: 'Castle in the Sky',
      movie_banner: 'https://www.ghibli.jp/gallery/chihiro.jpg',
      description:
        'The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the evil Muska in pursuit, she and resourceful Pazu take to the skies in a giant robot to seek the legendary floating castle.',
      director: 'Hayao Miyazaki',
      producer: 'Isao Takahata',
    };

    inMemoryFilmRepository.films = Array(50).fill(film);

    const paginatedFilms = await findPaginatedUseCase.execute(1);

    expect(paginatedFilms[0]).toEqual(
      inMemoryFilmRepository.films.slice(0, 10),
    );
    expect(paginatedFilms[1]).toEqual(50);

    const paginatedFilms2 = await findPaginatedUseCase.execute(2);

    expect(paginatedFilms2[0]).toEqual(
      inMemoryFilmRepository.films.slice(10, 20),
    );
    expect(paginatedFilms2[1]).toEqual(50);
  });
});
