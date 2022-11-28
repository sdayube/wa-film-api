import express from 'express';
import axios from 'axios';
import 'reflect-metadata';
import { container } from 'tsyringe';

import './data/configuration/container';

import { dataSource } from './data/index';

import { ResetFilmsUseCase } from './core/useCases/ResetFilmsUseCase';
import { FindPaginatedUseCase } from './core/useCases/FindPaginatedUseCase';

import { IResetFilmsDTO } from './data/DTOs/IResetFilmsDTO';

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
      const filmList = response.data.map((film: IResetFilmsDTO) => {
        const { title, movie_banner, description, director, producer } = film;

        return {
          title,
          movie_banner,
          description,
          director,
          producer,
        };
      }) as IResetFilmsDTO[];

      const resetFilmsUseCase = container.resolve(ResetFilmsUseCase);

      resetFilmsUseCase.execute(filmList).then(() => {
        res.status(200).json({ message: 'Films have been updated!' });
      });
    });
});

app.get('/films', (req, res) => {
  const page = Number(req.query.page) || 1;

  const findPaginatedUseCase = container.resolve(FindPaginatedUseCase);

  findPaginatedUseCase.execute(page).then((films) => {
    res.status(200).json({
      films: films[0],
      pageCount: Math.ceil(films[1] / 10),
    });
  });
});

app.listen(3333, () => {
  console.log('Server listening on port 3333');
});
