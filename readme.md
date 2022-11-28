# WR Film API

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

*Obs.: Como existem apenas 22 filmes do Studio Ghibli no total, nao é possível buscar 50 filmes, mas o limitador de busca está ativo e, caso isso mude um dia, a API permanecerá buscando o máximo de 50 filmes.*