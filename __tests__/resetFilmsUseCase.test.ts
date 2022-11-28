import { InMemoryFilmRepository } from '../src/data/repositories/InMemFilmRepository';

import { ResetFilmsUseCase } from '../src/core/useCases/ResetFilmsUseCase';

let resetFilmsUseCase: ResetFilmsUseCase;
let inMemoryFilmRepository: InMemoryFilmRepository;

describe('Reset Films', () => {
  beforeEach(() => {
    inMemoryFilmRepository = new InMemoryFilmRepository();
    resetFilmsUseCase = new ResetFilmsUseCase(inMemoryFilmRepository);
  });

  it('should be able to reset films', async () => {
    const film = {
      title: 'Castle in the Sky',
      movie_banner: 'https://www.ghibli.jp/gallery/chihiro.jpg',
      description:
        'The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the evil Muska in pursuit, she and resourceful Pazu take to the skies in a giant robot to seek the legendary floating castle.',
      director: 'Hayao Miyazaki',
      producer: 'Isao Takahata',
    };

    const film2 = {
      title: 'title',
      movie_banner: 'movie_banner',
      description: 'description',
      director: 'director',
      producer: 'producer',
    };

    await resetFilmsUseCase.execute(Array(50).fill(film2));

    let films = inMemoryFilmRepository.films;

    expect(films[0]).toEqual(film2);
    expect(films.length).toEqual(50);

    await resetFilmsUseCase.execute(Array(25).fill(film));

    films = inMemoryFilmRepository.films;

    expect(films[0]).toEqual(film);
    expect(films.length).toEqual(25);
  });
});
