import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

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

  async personRegistration(pessoa) {
    const {
      cpf,
      nome_completo,
      data_nasc,
      celular,
      email,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      uf,
    } = pessoa;

    await sql`INSERT INTO tbl_ent (cpf, nome_completo, data_nasc, celular, email, cep, endereco, numero, bairro, cidade, uf ) VALUES (${cpf}, ${nome_completo}, ${data_nasc}, ${celular}, ${email}, ${cep}, ${endereco}, ${numero}, ${bairro}, ${cidade}, ${uf} )`;
  }

  async UserRegistration(user) {
    try {
      const { username, senha, cpf_user } = user;
      const userResult = await sql`SELECT COUNT(cpf_user) as userCount FROM tbl_user WHERE cpf_user = ${cpf_user}`;
      const userRowCount = userResult[0].userCount;

      if (userRowCount > 0) {
        console.log("Já existe um usuário com esse CPF.");
        return;
      } else {
        const userId = randomUUID();
        await sql`INSERT INTO tbl_user (id_user, username, senha, cpf_user) VALUES (${userId}, ${username}, ${senha}, ${cpf_user})`;
      }
    } catch (error) {
      console.error("Ocorreu um erro durante o registro do usuário:", error);
    }
  }

  async update(id, video) {
    const { title, description, duration } = video;
    await sql`UPDATE videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
  }

  async delete(id) {
    await sql`DELETE FROM videos WHERE id = ${id}`;
  }
}
