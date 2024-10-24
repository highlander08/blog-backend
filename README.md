API de blog de postagem de fotos usando NestJS com autenticação, postagem de fotos e criação de categoria:

```markdown
# Photo Blog API

This is a RESTful API built with [NestJS](https://nestjs.com/) that allows users to create and manage photo blog posts with authentication. The API includes features such as user authentication, photo posting, and category creation for better content organization.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Photo Posts](#photo-posts)
  - [Categories](#categories)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

## Recursos
- Criando CRUD para postagens e categorias
- Integrando com Typeorm 
- Criando Entidade de postagem e criação da tabela de postagem 
- Criando padrão de repositório
- Criando Autenticação de usuário usando JWT (JSON Web Token) 
- Criando Relações MySql usando Typeorm 
- Usando pacotes de classes de validação e classes de transformação 
- Criando ouvintes de eventos ou hooks no Typeorm
- Ocultando propriedades da entidade na resposta
- Criando Serviços extras em postagem 
- Registrando usuário no banco de dados
Protegendo rotas com guard 
- Criando decoradores personalizados
- Carregando arquivos em NestJS 
- Controlando acesso baseado em função

## Technologies Used

- **NestJS**: A progressive Node.js framework.
- **JWT**: For secure authentication.
- **TypeORM**: ORM for database management.
- **MySql**: Database used for persistence.
- **Multer**: Middleware for handling file uploads.
- **Local Storage**: Disk Local

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/highlander08/blog-bakcend
   cd blog-backend 
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project with the following keys:

   ```env
   DATABASE_URL=your_mysql_database_url
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the database migrations**:
   ```bash
   npm run migration:run
   ```

5. **Start the development server**:
   ```bash
   npm run start:dev
   ```

## Usage

- Para interagir com a API, use um cliente REST (por exemplo, Postman ou insominia) ou integre-o ao seu aplicativo frontend.
- A autenticação é necessária para a maioria dos endpoints, exceto para listagens de fotos públicas.

## API Endpoints

### Authentication

- **Register**: `POST /auth/register`
  - Registers a new user.
  - **Request body**:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Login**: `POST /auth/login`
  - AUTHENTICATES a user and returns a JWT token- **Login**: `POST /auth/login`
  - Authenticates a user and returns a JWT token.
  - **Request body**:
    ```json
    {
      "email": "string",
      "passw.
  - **Request body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }

  - **Logout**: `POST /auth/logout`
    ```

### Photo Posts

- **Create a Post**: `POST /posts`
  - Requires authentication.
  - **Request body** (multipart form-data for file upload):
    ```json
    {
      "title": "string",
      "description": "string",
      "categoryId": "number",
      "photo": "file"
    }
    ```

- **Get All Posts**: `GET /posts`
  - Retrieves all posts (publicly accessible).

- **Get Post by ID**: `GET /posts/:id`
  - Retrieves a specific post by ID.

- **Update Post**: `PATCH /posts/:id`
  - Requires authentication and ownership of the post.

- **Delete Post**: `DELETE /posts/:id`
  - Requires authentication and ownership of the post.

### Categories

- **Create a Category**: `POST /categories`
  - Requires authentication.
  - **Request body**:
    ```json
    {
      "name": "string"
    }
    ```

- **Get All Categories**: `GET /categories`
  - Retrieves all categories.

- **Update Category**: `PATCH /categories/:id`
  - Requires admin role.

- **Delete Category**: `DELETE /categories/:id`
  - Requires admin role.

## Running Tests

To run unit tests:

```bash
npm run test
```

To run end-to-end tests:

```bash
npm run test:e2e
```

To check test coverage:

```bash
npm run test:cov
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Notas:
- **Autenticação**: Usei JWT para autenticação segura.
- **Upload de arquivos**: O pacote `Multer` é utilizado para upload de fotos.
- **Banco de dados**: Configurei com PostgreSQL, mas você pode substituir conforme suas necessidades.
- **Armazenamento de fotos**: O projeto usa um armazenamento em nuvem opcional para armazenar imagens.
