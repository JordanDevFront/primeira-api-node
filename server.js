import { fastify } from "fastify";
import { DataBasePostgres } from "./database-postgres.js";
import bcrypt from 'bcrypt';

const server = fastify();

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

/*FUNÇÕES */


/*API PROJETO*/
server.post("/auth/register/", async (request, response) => {
  const {
    cpf,
    nome_completo,
    data_nasc,
    celular,
    email,
    username,
    senha,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    uf,
  } = request.body;
    if (!cpf || cpf.trim() === "") {
      return response.status(400).send({ message: "Campo CPF é obrigatório!" });
    }
    if (!nome_completo || nome_completo.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Nome completo é obrigatório!" });
    }
    if (!data_nasc || data_nasc.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Data de Nascimento é obrigatório!" });
    }
    if (!celular || celular.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Celular é obrigatório!" });
    }
    if (!email || email.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Email é obrigatório!" });
    }
    if (!username || username.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Usuário é obrigatório!" });
    }
    if (!senha || senha.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Senha é obrigatório!" });
    }
    if (!cep || cep.trim() === "") {
      return response.status(400).send({ message: "Campo CEP é obrigatório!" });
    }
    if (!endereco || endereco.trim() === "") {
      return response.status(400).send({ message: "Campo Rua é obrigatório!" });
    }
    if (!numero || numero.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Número é obrigatório!" });
    }
    if (!bairro || bairro.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Bairro é obrigatório!" });
    }
    if (!cidade || cidade.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Cidade é obrigatório!" });
    }
    if (!uf || uf.trim() === "") {
      return response
        .status(400)
        .send({ message: "Campo Estado é obrigatório!" });
    }
    

    try {
      const existingUser = await database.registerUser({ username });
      const existingEmail = await database.registerEmail({email})

      if (existingUser && existingUser.length > 0) {
        return response
          .status(400)
          .send({ message: "Nome de usuário já registrado na tabela!" });
      }if(existingEmail && existingEmail.length > 0){
        return response
        .status(400)
        .send({ message: "Já existe um usuário com esse Email, por favor digite outro email!" });
      } else {
        const hash = await bcrypt.hash(senha, 10);
        await database.personRegistration({
          cpf,
          nome_completo,
          data_nasc,
          celular,
          email,
          username,
          senha: hash,
          cep,
          endereco,
          numero,
          bairro,
          cidade,
          uf,
        });
        return response
          .status(201)
          .send({ message: "Registro criado com sucesso!" });
      }
    } catch (error) {
      console.error("Erro no servidor:", error);
      return response.status(500).send({ message: "Erro no servidor!" });
    }
    
    

});

server.get("/registrations", async (request) => {
  const search = request.query.search;

  console.log(search);
  const videos = await database.listRegistrations(search);
  console.log(videos);
  return videos;
});

/*server.post("/auth/registerUser/", async (request, reply) => {
  const { username, senha, cpf_user } = request.body;

  try {
    if (!username || username.trim() === "") {
      return reply
        .status(400)
        .send({ message: "Campo usuário é obrigatório!" });
    }
    if (!senha || senha.trim() === "") {
      return reply.status(400).send({ message: "Campo senha é obrigatório!" });
    }

    verificarCPF({cpf_user})
      .then((existe) => {
        if (existe) {
          console.log("CPF já existe na base de dados.");
        } else {
          console.log("CPF ainda não existe na base de dados.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });

    await database.UserRegistration({
      username,
      senha,
      cpf_user,
    });

    return reply
      .status(201)
      .send({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor." });
  }
});*/

server.listen({
  port: 3333,
});
