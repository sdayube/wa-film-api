import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import 'reflect-metadata';
import { container } from 'tsyringe';

import './data/configuration/container';

import { dataSource } from './data/index';

import { ResetFilmsUseCase } from './core/useCases/ResetFilmsUseCase';
import { FindPaginatedUseCase } from './core/useCases/FindPaginatedUseCase';

import { IResetFilmsDTO } from './data/DTOs/IResetFilmsDTO';

import filmSeed from './seed/films.json';

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
    })
    .catch((err) => {
      res.status(503).json({
        message: 'Error fetching from Studio Ghibli API: ' + err.message,
      });
    });
});

app.put('/films-from-seed', (req, res) => {
  const resetFilmsUseCase = container.resolve(ResetFilmsUseCase);
  const filmList = filmSeed as IResetFilmsDTO[];

  resetFilmsUseCase.execute(filmList).then(() => {
    res.status(200).json({ message: 'Films have been updated!' });
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

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
