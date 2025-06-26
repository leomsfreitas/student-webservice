# Web Service de Alunos com JWT

Este repositório traz um projeto simples para a disciplina **Programação Web 2**, focado em autenticação de usuários com JWT, armazenamento de dados em arrays e rotas protegidas usando Express.js.

## Sobre o Projeto

A aplicação é uma API REST feita com Node.js e Express. Permite cadastrar e logar usuários usando JWT. Depois de logado, dá pra acessar rotas protegidas para gerenciar alunos.

Todos os dados (usuários e alunos) ficam em **arrays na memória**. O `id` do aluno é informado manualmente.

### Funcionalidades

- **/register**: Cadastro de usuário com senha criptografada (bcrypt)
- **/login**: Gera um token JWT válido por 1 hora
- **/alunos**:
  - `GET`: Lista todos os alunos (protegido)
  - `POST`: Adiciona aluno (protegido)
  - `PUT /alunos/:id`: Atualiza aluno (protegido)
  - `DELETE /alunos/:id`: Remove aluno (protegido)

## Tecnologias

- **Node.js**
- **Express.js**
- **JWT**
- **BcryptJS**
- **dotenv**

## Estrutura

```
student-webservice/
├── .env
├── server.js
├── package.json
└── README.md
```

## Observações

- Não usa banco de dados, só arrays em memória.
- O campo `id` do aluno é informado no corpo da requisição.
- O token JWT vai no cabeçalho: `Authorization: Bearer <token>`

## Exemplos

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

Resposta:
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

Projeto feito para a disciplina **PRW2 (Programação Web 2)**.
