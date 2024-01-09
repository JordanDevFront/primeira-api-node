/*import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.write("Oi");
  return response.end();
});

server.listen(3333);*/

import { fastify } from "fastify";
//import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
import { sql } from "./db.js";

const database = new DataBasePostgres();

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;

  console.log(search);
  const videos = await database.list(search);
  console.log(videos);
  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});


/*API PROJETO*/
server.post("/auth/register/", async (request, reply) => {
  const { cpf, nome_completo, data_nasc, celular, email, cep, endereco, numero, bairro, cidade, uf } = request.body;

  await database.personRegistration({
    cpf, nome_completo, data_nasc, celular, email, cep, endereco, numero, bairro, cidade, uf 
  });

  return reply.status(201).send();
});

server.post("/auth/registerUser/", async (request, reply) => {
  const { username, senha, cpf_user } = request.body;

  if (!username) {
    return console.log("Nome é obrigatório!");
  }
  if (!senha) {
    return console.log("Senha é obrigatório!");
  }

  await database.UserRegistration({
    username,
    senha,
    cpf_user,
  });
  return reply.status(201).send();
});

server.listen({
  port: 3333,
});
