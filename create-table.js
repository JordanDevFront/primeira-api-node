import { sql } from "./db.js";

/**sql`DROP TABLE IF EXISTS videos`.then(() => {
  console.log("Tabela Excluida!");
}); */

/*sql`

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
    uf TEXT not null,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`.then(() => {
  console.log("Tabela criada!");
});*/


/*sql`DROP TABLE IF EXISTS tbl_user`.then(() => {
  console.log("Tabela Excluida!");
});*/

/*sql`

CREATE TABLE tbl_user (
  id_user TEXT PRIMARY KEY,          -- Chave primária autoincremental
  username VARCHAR(50) NOT NULL,       -- Nome do usuário
  senha VARCHAR(50) NOT NULL,          -- Senha do usuário
  cpf_user VARCHAR(11) NOT NULL,       -- CPF do usuário
  FOREIGN KEY (cpf_user) REFERENCES tbl_ent(cpf)
);
`.then(() => {
  console.log("Tabela criada!");
});*/


/*sql`

CREATE TABLE tbl_categoria (
  id_cat INT PRIMARY KEY,
  descricao VARCHAR(100) not null
)
`.then(() => {
  console.log("Tabela criada!");
});*/


/*sql`

CREATE TABLE tbl_prod (
  id_prod TEXT PRIMARY KEY,
  nome_prod VARCHAR(100) NOT NULL,
  descricao VARCHAR(100) NOT NULL,
  classificacao VARCHAR(30) NOT NULL,
  id_categoria INT, -- Adicionando a coluna id_categoria
  FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id_cat),
  preco VARCHAR(20) NOT NULL,
  qnt INT NOT NULL,
  desconto VARCHAR(20),
  preco_desconto VARCHAR(20),
  qnt_parcelas INT NOT NULL,
  valor_parcela VARCHAR(20),
  frete INT NOT NULL,
  valor_frete VARCHAR(20) NOT NULL,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`.then(() => {
  console.log("Tabela criada!");
});*/

sql`

CREATE TABLE tbl_ent_user_1 (
    cpf TEXT PRIMARY KEY not null,
    rg TEXT not null,
    nome_completo TEXT not null,
    nome_mae TEXT not null,
    data_nasc TEXT not null,
    celular TEXT not null,
    email TEXT not null,
    cargo TEXT not null,
    username TEXT not null,
    senha TEXT not null,
    cep TEXT not null,
    endereco TEXT not null,
    numero TEXT not null,
    bairro TEXT not null,
    cidade TEXT not null,
    uf TEXT not null,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`.then(() => {
  console.log("Tabela criada!");
});


