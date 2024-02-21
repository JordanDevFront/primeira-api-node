import { sql } from "./db.js";
import { randomUUID } from "node:crypto";

//git rm --cached .env

export class DataBasePostgres {
  #videos = new Map();

  async list(search) {
    let videos;
    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title ilike ${
        "%" + search + "%"
      }`;
    } else {
      videos = await sql`SELECT * FROM videos`;
    }
    return videos;
  }

  async create(video) {
    const videoId = randomUUID();
    const { title, array_produtos } = video;
    await sql`INSERT INTO teste (id, title, array_produtos) VALUES (${videoId}, ${title}, ${array_produtos})`;
  }

  async createSend({ uuid, storeId, product, quantity, price }) {
    const id = randomUUID();
    await sql`INSERT INTO orders (id, uuid, storeId, product, quantity, price) VALUES (${id}, ${uuid}, ${storeId}, ${product}, ${quantity}, ${price})`;
    return id; // Retorna o ID do item inserido
  }
  
  

  async update(id, video) {
    const { title, description, duration } = video;
    await sql`UPDATE videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`DELETE FROM videos WHERE id = ${id}`;
  }

  /* API  POST*/
  async personRegistration(pessoa) {
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
    } = pessoa;
    await sql`INSERT INTO tbl_ent (cpf, nome_completo, data_nasc, celular, email, username, senha, cep, endereco, numero, bairro, cidade, uf ) VALUES (${cpf}, ${nome_completo}, ${data_nasc}, ${celular}, ${email}, ${username}, ${senha}, ${cep}, ${endereco}, ${numero}, ${bairro}, ${cidade}, ${uf} )`;
  }
  async registerProd(prod) {
    const idProd = randomUUID();
    const {
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
    } = prod;
    await sql`INSERT INTO tbl_prod (
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
      valor_frete) VALUES (${idProd},${nome_prod}, ${descricao}, ${classificacao}, ${id_categoria}, ${preco}, ${qnt}, ${peso}, ${desconto}, ${preco_desconto}, ${qnt_parcelas}, ${valor_parcela}, ${frete}, ${valor_frete} )`;
  }
  async registerCategory(cat) {
    const idCategoria = randomUUID();
    const { descricao } = cat;

    await sql`INSERT INTO tbl_categoria (id_cat, descricao) VALUES (${idCategoria}, ${descricao})`;
  }
  async personRegistrationUser(pessoa) {
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
    } = pessoa;
    await sql`INSERT INTO tbl_ent_user_1 (cpf, rg, nome_completo, nome_mae, data_nasc, celular, email, cargo, username, senha, cep, endereco, numero, bairro, cidade, uf ) VALUES (${cpf}, ${rg}, ${nome_completo}, ${nome_mae}, ${data_nasc}, ${celular}, ${email}, ${cargo}, ${username}, ${senha}, ${cep}, ${endereco}, ${numero}, ${bairro}, ${cidade}, ${uf} )`;
  }
  async orderPending(pedido){
    const idPedido = randomUUID();
    const {
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
      array_produtos,
      status_pedido,
      peso_total,
      valor_total,
    } = pedido;
  
    // Mapear os produtos corretamente
    const produtosMapeados = array_produtos.map(({ id_prod, nome_produto, qnt, preco_unit, peso }) => ({
      id_prod,
      nome_produto,
      qnt,
      preco_unit,
      peso
    }));
  
    await sql`INSERT INTO tbl_pedido(
      id_pedido,
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
      array_produtos,
      status_pedido,
      peso_total,
      valor_total
    ) VALUES (
      ${idPedido}, 
      ${nome_cliente}, 
      ${celular}, 
      ${email}, 
      ${cep}, 
      ${endereco}, 
      ${numero}, 
      ${bairro}, 
      ${cidade}, 
      ${estado_uf}, 
      ${forma_pagamento}, 
      ${status_pagamento}, 
      ${frete}, 
      ${valor_frete}, 
      ${status_arquivo}, 
      ${arquivo}, 
      ${status_envio}, 
      ${status_envio_descricao}, 
      ${JSON.stringify(produtosMapeados)},  -- Convertendo para JSON antes de inserir
      ${status_pedido}, 
      ${peso_total}, 
      ${valor_total}
    )`;
  }
  

  /*FUNÇÃO */
  async tocheckUser(pessoa) {
    const { username } = pessoa;
    const result =
      await sql`SELECT * FROM tbl_ent WHERE username = ${username}`;
    return result;
  }
  async tocheckEmail(pessoa) {
    const { email } = pessoa;
    const result = await sql`SELECT * FROM tbl_ent WHERE email = ${email}`;
    return result;
  }
  async tocheckUserUser(pessoa) {
    const { username } = pessoa;
    const result =
      await sql`SELECT * FROM tbl_ent_user_1 WHERE username = ${username}`;
    return result;
  }
  async tocheckUserUser(pessoa) {
    const { email } = pessoa;
    const result =
      await sql`SELECT * FROM tbl_ent_user_1 WHERE email = ${email}`;
    return result;
  }
  async tocheckCategoria(category) {
    const { descricao } = category;
    const result =
      await sql`SELECT * FROM tbl_categoria WHERE descricao = ${descricao}`;
    return result;
  }

  //API GET
  async listRegistrations(search) {
    let pessoas;
    if (search) {
      pessoas = await sql`SELECT * FROM tbl_ent WHERE cpf ilike ${
        "%" + search + "%"
      }`;
    } else {
      pessoas = await sql`SELECT * FROM tbl_ent`;
    }
    return pessoas;
  }

  async listPedidosPendente(search){
    let pedido;
    if (search) {
      pedido = await sql`SELECT * FROM tbl_pedido WHERE id_pedido ilike ${
        "%" + search + "%"
      }`;
    } else {
      pessoas = await sql`SELECT * FROM tbl_pedido`;
    }
    return pessoas;
  }

  async listProd(search) {
    let produto;
    if (search) {
      produto = await sql`SELECT * FROM tbl_prod WHERE id_prod ilike ${
        "%" + search + "%"
      }`;
    } else {
      produto = await sql`SELECT * FROM tbl_prod`;
    }
    return produto;
  }
}
