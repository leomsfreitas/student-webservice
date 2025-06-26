import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(express.json());

const users = [];
const alunos = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const exists = users.find(u => u.username === username);
  if (exists) return res.status(400).send("Usuário já existe.");
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.status(201).send("Usuário registrado com sucesso.");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Credenciais inválidas.");
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function authenticateJWT(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).send("Token não fornecido.");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Token inválido ou expirado.");
    req.user = user;
    next();
  });
}

app.get("/alunos", authenticateJWT, (req, res) => {
  res.json(alunos);
});

app.post("/alunos", authenticateJWT, (req, res) => {
  const { id, nome, curso } = req.body;
  if (!id || !nome || !curso) return res.status(400).send("Dados incompletos.");
  alunos.push({ id, nome, curso });
  res.status(201).send("Aluno cadastrado.");
});

app.put("/alunos/:id", authenticateJWT, (req, res) => {
  const id = req.params.id;
  const aluno = alunos.find(a => a.id == id);
  if (!aluno) return res.status(404).send("Aluno não encontrado.");
  const { nome, curso } = req.body;
  if (nome) aluno.nome = nome;
  if (curso) aluno.curso = curso;
  res.send("Aluno atualizado.");
});

app.delete("/alunos/:id", authenticateJWT, (req, res) => {
  const id = req.params.id;
  const index = alunos.findIndex(a => a.id == id);
  if (index === -1) return res.status(404).send("Aluno não encontrado.");
  alunos.splice(index, 1);
  res.send("Aluno removido.");
});

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});
