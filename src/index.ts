import express from 'express';
import axios from 'axios';

const app = express();

interface Film {
  title: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
}

app.post('/films', (req, res) => {
  axios
    .get('https://ghibliapi.herokuapp.com/films', {
      headers: { 'accept-encoding': null },
    })
    .then((response) => {
      const filmList = response.data.map((film: Film) => {
        const {
          title,
          movie_banner: banner,
          description,
          director,
          producer,
        } = film;

        return {
          title,
          banner,
          description,
          director,
          producer,
        };
      });

      res.json(filmList);
    });
});

app.listen(3333, () => {
  console.log('Server listening on port 3333');
});
