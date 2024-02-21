import { fastify } from "fastify";
import cors from "@fastify/cors"
import { DataBasePostgres } from "./database-postgres.js";
import bcrypt, { hash } from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';
import { sql } from "./db.js";
import { randomUUID } from "node:crypto";

const server = fastify();
const database = new DataBasePostgres();
const SECRET = "123"

const generateToken = (user) => {
  return jwt.sign({ cpf: user.cpf, username: user.username }, SECRET, {expiresIn: '1h'});
};

const verifyJWT = async (request, reply) => {
  try {
    const authorizationHeader = request.headers["authorization"];
    if (!authorizationHeader) {
      return reply.status(401).send({ error: "Token não fornecido" });
    }
    const token = authorizationHeader.replace("Bearer ", ""); // Removendo o prefixo 'Bearer '
    jwt.verify(token, SECRET, { algorithms: ["HS256"] }, (err, decoded) => {
      if (err) {
        console.error("Erro na verificação do token:", err);
        return reply.status(401).send({ error: "Token inválido" });
      }
      request.user = { cpf: decoded.cpf, username: decoded.username }; // Definindo o usuário no objeto de solicitação
    });
  } catch (err) {
    console.error("Erro:", err);
    return reply.status(500).send({ error: "Erro interno do servidor" });
  }
};

/**server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
}); */

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


//sistema de gerenciamento POST
server.post("/auth/login", async (req, res) => {
  const { username, senha } = req.body;

  try {
    const queryResult =
      await sql`SELECT * FROM tbl_ent_user_1 WHERE username = ${username}`;
    const user = queryResult[0];

    if (!user) {
      return res.status(401).send({ error: "Usuário não encontrado!" });
    }

    const result = await bcrypt.compare(senha, user.senha);
    //const listDados = [user.cpf, user.username, user.senha];

    if (result) {
      const token = generateToken(user);
      return res
        .status(200)
        .send({ auth: true, token, cpf: user.cpf, username: user.username });
    } else {
      return res.status(401).send({ error: "Senha incorreta!" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
});

server.post("/auth/registerUser/", { preHandler: verifyJWT }, async (request, response) => {
  const {
    cpf,
    rg,
    nome_completo,
    nome_mae,
    data_nasc,
    celular,
    email,
    cargo,
    username,
    senha,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    uf,
  } = request.body;  

    try {
        const hash = await bcrypt.hash(senha, 10);
        await database.personRegistrationUser({
          cpf,
          rg,
          nome_completo,
          nome_mae,
          data_nasc,
          celular,
          email,
          cargo,
          username,
          senha:hash,
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
      }catch (error) {
      console.error("Erro no servidor:", error);
      return response.status(500).send({ message: "Erro no servidor!" });
    }
});

server.post("/resgister/product/", { preHandler: verifyJWT }, async (request, response) => {
  const {
    id_prod,
    nome_prod,
    descricao,
    classificacao,
    id_categoria,
    preco,
    qnt,
    peso,
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
      peso,
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

server.post("/resgister/category/", { preHandler: verifyJWT }, async (request, response) => {
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

server.post("/pending/orders/", async (request, response) => {
  const {
    id_user_cpf,
    nome_cliente,
    celular,
    email,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado_uf,
    forma_pagamento,
    status_pagamento,
    frete,
    valor_frete,
    status_arquivo = 1, // aqui ele vem sempre como 1, pois o objeto arquivo estará null, quando ele fora alterado o status_arquivo altera para 2
    arquivo,
    status_envio,
    status_envio_descricao,
    array_produtos,
    status_pedido,
    peso_total,
    valor_total
  } = request.body;

  try {
    await database.orderPending({
      id_user_cpf,
      nome_cliente,
      celular,
      email,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado_uf,
      forma_pagamento,
      status_pagamento,
      frete,
      valor_frete,
      status_arquivo,
      arquivo,
      status_envio,
      status_envio_descricao,
      array_produtos: array_produtos.map(({ id_prod, nome_produto, qnt, preco_unit, peso }) => ({
        id_prod,
        nome_produto,
        qnt,
        preco_unit,
        peso
      })),
      status_pedido,
      peso_total,
      valor_total
    });
    return response
      .status(201)
      .send({ message: "Compra efetuada com sucesso!" });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return response.status(500).send({ message: "Erro no servidor!" });
  }
});


server.post("/teste/teste/", async (request, response) => {
  try {
    const { title, array_produtos } = request.body;

    const orderDetails = array_produtos.map((item) => [
      title,
      JSON.stringify(item)
    ]);

    // Inserindo o registro principal
    await database.create({
      title,
      array_produtos
    });

    // Inserindo detalhes do pedido
    const query = "INSERT INTO order_details (title, product_details) VALUES ?";

    // Supondo que `connection` é sua conexão com o banco de dados
    await sql.query(query, [orderDetails]);

    return response
      .status(201)
      .send({ message: "Registro criado com sucesso!" });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return response.status(500).send({ message: "Erro no servidor!" });
  }
});

server.post("/send/", async (req, response) => {
  try {
    const { uuid, storeId, product } = req.body; // Extrai os dados do corpo da requisição
    const createdItems = await Promise.all(product.map(async (item) => {
      const { id, name, quantity, price } = item;
      return await database.createSend({ uuid, storeId, product: JSON.stringify({ id, name }), quantity, price });
    }));

    console.log("Itens criados com sucesso:", createdItems); // Adiciona um console.log para depurar

    return response
      .status(201)
      .send({ message: "Registro(s) criado(s) com sucesso!" });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return response.status(500).send({ message: "Erro no servidor!" });
  }
});




/* Ecommerce GET */
server.get("/registrations/", { preHandler: verifyJWT }, async (request, reply) => {
  try {
    const search = request.query.search;

    const usuario = await database.listRegistrations(search);

    return reply.send(usuario);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
});

/* Ecommerce GET */
server.get("/list/pending/orders/", { preHandler: verifyJWT }, async (request, reply) => {
  try {
    const search = request.query.search;

    const pedido = await database.listPedidosPendente(search);

    return reply.send(pedido);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
});

/*Ecommerce POST*/
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



/* Ecommerce e sistema de gerenciamento GET */
server.get("/products/", { preHandler: verifyJWT }, async (request, reply) => {
  try {
    const search = request.query.search;

    const prod = await database.listProd(search);
    return reply.send(prod);
  } catch {
    return reply.status(500).send({ error: "Erro interno do servidor" });
  }
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