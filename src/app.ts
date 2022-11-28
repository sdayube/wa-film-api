import express from 'express';
import axios from 'axios';

import { Film } from './core/entities/Film.entity';
import { dataSource } from './data/index';

import FilmRepository from './data/repositories/FilmRepository';

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = express();

app.put('/films', (req, res) => {
  axios
    .get('https://ghibliapi.herokuapp.com/films?limit=50', {
      headers: { 'accept-encoding': null },
    })
    .then((response) => {
      const filmList = response.data.map((film: Film) => {
        const { title, movie_banner, description, director, producer } = film;

        return {
          title,
          movie_banner,
          description,
          director,
          producer,
        };
      }) as Film[];

      const filmRepository = new FilmRepository();

      filmRepository.resetFilms(filmList).then(() => {
        res.status(200).json({ message: 'Films have been updated!' });
      });
    });
});

app.get('/films', (req, res) => {
  const page = Number(req.query.page) || 1;
  const filmRepository = new FilmRepository();

  filmRepository.findPaginated(page).then((films) => {
    res.status(200).json({
      films: films[0],
      pageCount: Math.ceil(films[1] / 10),
    });
  });
});

app.listen(3333, () => {
  console.log('Server listening on port 3333');
});
