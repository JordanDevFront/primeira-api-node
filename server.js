import { fastify } from "fastify";
import cors from "@fastify/cors"
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


/*API PROJETO POST*/
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
      const existingUser = await database.tocheckUser({ username });
      const existingEmail = await database.tocheckEmail({email})

      if (existingUser && existingUser.length > 0) {
        return response
          .status(400)
          .send({ message: "Nome de usuário já registrado!" });
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

server.post("/resgister/product/", async (request, response) => {
  const {
    id_prod,
    nome_prod,
    descricao,
    classificacao,
    id_categoria,
    preco,
    qnt,
    desconto,
    preco_desconto,
    qnt_parcelas,
    valor_parcela,
    frete,
    valor_frete,
  } = request.body;

  try {
    await database.registerProd({
      id_prod,
      nome_prod,
      descricao,
      classificacao,
      id_categoria,
      preco,
      qnt,
      desconto,
      preco_desconto,
      qnt_parcelas,
      valor_parcela,
      frete,
      valor_frete,
    });
    return response
      .status(201)
      .send({ message: "Registro criado com sucesso!" });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return response.status(500).send({ message: "Erro no servidor!" });
  }
});

server.post("/resgister/category/", async (request, response) => {
  const {
    id_cat,
    descricao

  } = request.body;

  try {
    const existingCategoria = await database.tocheckCategoria({descricao})
    if (existingCategoria && existingCategoria.length > 0){
      return response
      .status(400)
      .send({ message: "Essa categoria já existe!" });
    }else{
      await database.registerCategory({
        id_cat,
        descricao
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

/**
 * server.post("auth/logar", async (request, response) => {

})
 */


/*API PROJETO GET*/
server.get("/registrations/", async (request) => {
  const search = request.query.search;

  console.log(search);
  const videos = await database.listRegistrations(search);
  console.log(videos);
  return videos;
});

server.get("/products/", async (request) => {
  const search = request.query.search;

  console.log(search);
  const prod = await database.listProd(search);
  console.log(prod);
  return prod;
});

server.register(cors, {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
});

server.listen(8080, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Servidor web habilitado para CORS escutando na porta 8080');
});