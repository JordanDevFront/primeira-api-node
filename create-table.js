import { sql } from "./db.js";

/**sql`DROP TABLE IF EXISTS videos`.then(() => {
  console.log("Tabela Excluida!");
}); */

/*sql`

CREATE TABLE tbl_ent (
    cpf TEXT PRIMARY KEY,
    nome_completo TEXT,
    data_nasc TEXT,
    celular TEXT,
    email TEXT,
    cep TEXT,
    endereco TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    uf TEXT
)
`.then(() => {
  console.log("Tabela criada!");
});*/

sql`

CREATE TABLE tbl_user (
  id_user TEXT PRIMARY KEY,          -- Chave primária autoincremental
  username VARCHAR(50) NOT NULL,       -- Nome do usuário
  senha VARCHAR(50) NOT NULL,          -- Senha do usuário
  cpf_user VARCHAR(11) NOT NULL,       -- CPF do usuário

  -- Definindo a chave estrangeira para a tabela tbl_ent
  FOREIGN KEY (cpf_user) REFERENCES tbl_ent(cpf)
);
`.then(() => {
  console.log("Tabela criada!");
});

/*sql`DROP TABLE IF EXISTS tbl_user`.then(() => {
  console.log("Tabela Excluida!");
});*/

