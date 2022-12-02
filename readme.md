# WA Film API

Essa API foi desenvolvida como desafio técnico para a empresa WA - Work Anywhere, referente à parte do back-end.

Por se tratar de uma API simples, decidi por uma arquitetura de baixa complexidade, que facilite o entendimento da função de cada elemento do código, dividindo-o em Core (que guarda a entidade `Film`), Data (que guarda a lógica de requisição ao banco e migrations) e App (que guarda as rotas da aplicação).

Decidi por um banco em PostgreSQL com TypeORM, visto que sao ferramentas com as quais já trabalhei antes, mas como é uma aplicação simples qualquer banco poderia ter sido utilizado sem maiores dificuldades.

A aplicação está configurada para rodar via docker-compose, como é prática comum ao mercado. Para executar a aplicação:
- certifique-se de possuir o Docker instalado
- abra o terminal na pasta raiz
- execute o comando `docker-compose up` 
  - O **banco de dados** irá rodar na porta **5432** do localhost
  - A **aplicação** irá rodar na porta **3333** do localhost
  

## Rotas
- **PUT /films**: Busca até 50 filmes na API do Studio Ghibli e atualiza o banco de dados, removendo todos os filmes anteriores e inserindo todos os filmes retornados.

- **GET /films**: Retorna 10 filmes do banco de dados, de acordo com a página passada como query param (ou a página 1, por padrão), e o número total de páginas existentes.
  - Para buscar uma página específica utilize query params: **GET /films?page=1**

*Obs.: Como existem apenas 22 filmes do Studio Ghibli no total, nao é possível buscar 50 filmes, mas o limitador de busca está ativo e, caso isso mude um dia, a API permanecerá buscando o máximo de 50 filmes.*

*Obs2.: A API do Studio Ghibli saiu do ar essa semana e é possível que não retorne, em razão da desativação do plano gratuito do Heroku. Caso isso realmente seja o caso, é possível popular o banco de dados utilizando a rota:*
- **PUT /filmsFromSeed**: Busca os filmes em um JSON estático guardado na pasta `/seed` e atualiza o banco de dados, removendo todos os filmes anteriores e inserindo todos os filmes retornados.

## Testes
A aplicação inclui testes com Jest para ambos os casos de uso (resetar filmes e buscar filmes paginados).

Para rodar os testes, é necessário ter o yarn instalado, pois esse foi o gerenciador de pacotes utilizado nesse projeto. Feito isso, execute os comandos:
  - `yarn install`
  - `yarn test`


## Deploy
A aplicação e o banco de dados foram deployados por meio do plano gratuito da plataforma Render, que funciona de maneira similar ao Heroku. Para acessar as rotas em produção, utilize a url [wa-film-api.onrender.com/films](wa-film-api.onrender.com/films).

*Obs.: Como utilizei o plano gratuito, a aplicaçao irá entrar em standby após 15 minutos sem uso, ou seja, caso o primeiro request demore demais ou retorne um erro, o Render provavelmente está buildando a aplicação novamente. Tente novamente após cerca de 2 a 3 minutos e provavelmente o back-end irá funcionar normalmente.*
