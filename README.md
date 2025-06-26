# Web Service de Alunos com Autenticação JWT

Este repositório contém o projeto desenvolvido para o componente curricular **"Programação Web 2"**, com o objetivo de praticar autenticação de usuários utilizando JWT, armazenamento de dados em arrays locais e criação de rotas protegidas com Express.js.

## Descrição do Projeto

A aplicação é um Web Service (API RESTful) construído com Node.js e Express. Ela permite o cadastro e login de usuários com autenticação baseada em tokens JWT. Após autenticar, é possível acessar rotas protegidas para manipulação de dados de alunos.

Todas as informações (usuários e alunos) são armazenadas em **arrays locais**, conforme orientado em aula. O identificador (`id`) dos alunos é fornecido manualmente.

### Funcionalidades principais:

- **/register**: Cadastro de usuários com senha criptografada (bcrypt).
- **/login**: Retorna um token JWT válido por 1 hora.
- **/alunos**:
  - `GET`: Lista todos os alunos (rota protegida)
  - `POST`: Cadastra um novo aluno (rota protegida)
  - `PUT /alunos/:id`: Atualiza um aluno existente (rota protegida)
  - `DELETE /alunos/:id`: Remove um aluno existente (rota protegida)

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **JWT (`jsonwebtoken`)**
- **BcryptJS** para criptografia de senha
- **dotenv** para variáveis de ambiente

## Estrutura do Projeto

```
student-webservice/
├── .env               # Variáveis de ambiente (porta e chave JWT)
├── server.js          # Arquivo principal com rotas e lógica da aplicação
├── package.json       # Dependências e scripts
└── README.md          # Documentação do projeto
```

## Observações

- Não é utilizado nenhum banco de dados (SGBD). O armazenamento é feito em arrays de objetos diretamente na memória.
- O campo `id` do aluno deve ser informado manualmente no corpo da requisição (como combinado nas aulas).
- O token JWT deve ser enviado via cabeçalho `Authorization: Bearer <token>` para acessar as rotas protegidas.

## Exemplo de Uso

**Cadastro de Usuário (POST /register)**

```json
{
  "username": "admin",
  "password": "123456"
}
```

**Login (POST /login)**

```json
{
  "username": "admin",
  "password": "123456"
}
```

Retorno:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

**Cadastro de Aluno (POST /alunos)**

Cabeçalho:
```
Authorization: Bearer <token>
```

Corpo:
```json
{
  "id": 1,
  "nome": "Leo Freitas",
  "curso": "Engenharia de Software"
}
```

## Créditos

Projeto desenvolvido como parte da disciplina **PRW2 (Programação Web 2)**, sob orientação do professor responsável.
