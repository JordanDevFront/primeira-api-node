import { v4 as uuidv4 } from 'uuid';

import { sql } from "./db.js";

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
    const { title, description, duration } = video;

    await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;
    await sql`UPDATE videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`DELETE FROM videos WHERE id = ${id}`;
  }

  /* API */
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
    } = prod;
    await sql`INSERT INTO tbl_prod (
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
      valor_frete) VALUES (${id_prod},${nome_prod}, ${descricao}, ${classificacao}, ${id_categoria}, ${preco}, ${qnt}, ${desconto}, ${preco_desconto}, ${qnt_parcelas}, ${valor_parcela}, ${frete}, ${valor_frete} )`;
  }
  async registerCategory(cat){
    const {
      id_cat,
      descricao
    } = cat;
    
    await sql`INSERT INTO tbl_categoria (id_cat, descricao) VALUES (${id_cat}, ${descricao})`;
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
  async tocheckCategoria(category){
    const {descricao} = category;
    const result = await sql`SELECT * FROM tbl_categoria WHERE descricao = ${descricao}`;
    return result
  }

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
}
