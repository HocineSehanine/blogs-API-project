# Boas-vindas ao repositório do projeto API de Blogs!

<details>
  <summary><strong>👨‍💻 Detalhes do projeto</strong></summary><br />

  Blogs API é uma API e um banco de dados para a produção de conteúdo para um blog! 

  onde foi desenvolvida uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts desevolvendo:

  1. endpoints que estarão conectados ao seu banco de dados seguindo os princípios do REST;

  2. um post onde é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`; 

  3. a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

<br />
</details>
<details>
  <summary><strong>:memo: Habilidades desenvolvidas durante do projeto</strong></summary><br />

  Nesse projeto, foi capaz de:

  - Utilizar sequelize
  - Utilizar methodos GET POST DELETE PUT 
  - Utilizar um banco de dados dinamico
  - Vlidar senhas utilizando jwt
  - Vlidar inputs utilizando joi
  - Utilizar arquitetura Model Service Controller
  - Criar Banco de dados MySql
  
</details>

<details>
  <summary><strong>‼️ para rodar o projeto sera necessário: </strong></summary><br />

  1. Clone o repositório

  - Use o comando: `git clone git@https://github.com/HocineSehanine/blogs-API-project.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd recipes-app`

  2. Instale as dependências e inicialize o projeto

  - Instale as dependências:
    - `npm install`
   
  3. Rodar os containers
   
  - Rodar docker:
    - `docker-compose up -d`
    
  4. Criar banco de dados 
  
  - Configurar a conexão com banco de dados
   **Você irá precisar configurar as variáveis de ambiente para uso do MySQL.** Você pode usar esse [Arquivo de variáveis de ambiente](https://github.com/HocineSehanine/blogs-API-project/blob/main/.env.example) como referência.

  O arquivo a seguir, contém um modelo das variáveis de ambiente utilizadas no projeto. Para o contexto de teste local, é importante configurar as variáveis: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`:

  > 👉 `.env.example`
  ```env
       #### SERVER VARS
       NODE_ENV=development
       API_PORT=3000
       API_HOST=localhost
       #### DATABASE VARS
       MYSQL_HOST=localhost
       MYSQL_PORT=3306
       MYSQL_DB_NAME=blogs-api
       MYSQL_USER=root
       MYSQL_PASSWORD=password
       #### SECRECT VARS
       JWT_SECRET=suaSenhaSecreta
  ```
  #### Variável `JWT_SECRET`:
  
  Esta variável de ambiente deverá ser utilizada tanto para criar o token quanto para verificá-lo. Os teste locais e o avaliador vão utilizar a variável de ambiente `JWT_SECRET` para testar os requisitos

  - Criar banco de dados e rodar migrations:
    - `npm run prestart`
  - Rodar seedres:
    - `npm run seed`
  - Rodar servidor:
    - `npm run debug`
     
</details>
<details>
  <summary><strong>:memo: para utilização da API</strong></summary><br />
 utilização dos methodos
   

  - POST http://localhost:3000/login
    - `esse endponit é muito importante pra gerar um token que sera necessário nos proximos passos onde devemos declara o seguinte objeto no body:`
    ``` json {
        "email": "lewishamilton@gmail.com",
        "password": "123456"
      }```
  
  
  - POST http://localhost:3000/user
    - `esse endponit será utilisado para criar um novo usurio onde devemos declara o seguinte objeto no body:`
  
       ``` json {
          "displayName": "Brett Wiltshire",
          "email": "brett@email.com",
          "password": "123456",
          "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
          // a imagem não é obrigatória
        } ```
  
  
  - GET http://localhost:3000/user
    - `esse endponit será utilisado para listar todos os usurios`
    - `e será necessário declarar um token valido`
    
  - GET http://localhost:3000/user/:id
    - `esse endponit será utilisado para listar um usuario pelo seu id`
    - `e será necessário declarar um token valido`
      
  - POST http://localhost:3000/categories
    - `esse endponit será utilisado para adicionar uma nova categoria onde devemos declara o seguinte objeto no body:`
  

      ``` json {
          "name": "Typescript"
        } ```
    
  - GET http://localhost:3000/categories
    - `esse endponit será utilisado para listar todas as categorias`
    - `e será necessário declarar um token valido`
      
  - POST http://localhost:3000/post
    - `esse endponit será utilisado para adicionar um novo post onde devemos declara o seguinte objeto no body:`
  

      ```json {
          "title": "Latest updates, August 1st",
          "content": "The whole text for the blog post goes here in this key",
          "categoryIds": [1, 2]
        } ```
    
  - GET http://localhost:3000/post
      - `esse endponit será capaz de trazer todos os blogs post`
      - `e será necessário declarar um token valido`
  
  - GET http://localhost:3000/post/:id
      - `esse endponit será capaz de trazer um post pelo seu id`
      - `e será necessário declarar um token valido`
    
  - POST http://localhost:3000/post/:id
      - `esse endponit será utilisado para editar um post onde devemos declara o seguinte objeto no body:`
      -  `e será necessário declarar um token valido`
  

      ``` json {
          "title": "Latest updates, August 1st",
          "content": "The whole text for the blog post goes here in this key"
        } ```
    
   - DELETE http://localhost:3000/post/:id
      - `esse endponit será utilisado para deletar um post declarando seu id`
      - `e será necessário declarar um token valido`
  
   - DELETE http://localhost:3000/user/me
      - `esse endponit será utilisado para deletar um usuario atraves de id retirado do token`
      - `e será necessário declarar um token valido`
  
   - DELETE http://localhost:3000//post/search?q=:searchTerm
      - `esse endponit será capaz de trazer os blogs post baseados no q do banco de dados, se ele existir`
      - `e será necessário declarar um token valido`
</details>
