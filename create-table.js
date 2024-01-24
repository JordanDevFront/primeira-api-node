import { sql } from "./db.js";

/**sql`DROP TABLE IF EXISTS videos`.then(() => {
  console.log("Tabela Excluida!");
}); */

sql`

CREATE TABLE tbl_ent (
    cpf TEXT PRIMARY KEY not null,
    nome_completo TEXT not null,
    data_nasc TEXT not null,
    celular TEXT not null,
    email TEXT not null,
    username TEXT not null,
    senha TEXT not null,
    cep TEXT not null,
    endereco TEXT not null,
    numero TEXT not null,
    bairro TEXT not null,
    cidade TEXT not null,
    uf TEXT not null
)
`.then(() => {
  console.log("Tabela criada!");
});


/*sql`DROP TABLE IF EXISTS tbl_user`.then(() => {
  console.log("Tabela Excluida!");
});*/

/*sql`

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
});*/


