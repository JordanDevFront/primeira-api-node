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
  peso VARCHAR(20),
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

/*sql`

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
});*/


/*sql`

CREATE TABLE tbl_pedido (
  id_pedido TEXT PRIMARY KEY,
  id_user_cpf VARCHAR(11),
  nome_cliente VARCHAR(100),
  celular VARCHAR(20),
  email VARCHAR(100),
  cep VARCHAR(10),
  endereco VARCHAR(255),
  numero VARCHAR(100),
  bairro VARCHAR(100),
  cidade VARCHAR(100),
  estado_uf VARCHAR(100),
  forma_pagamento VARCHAR(50),
  status_pagamento VARCHAR(50),
  frete DECIMAL(10, 2),
  valor_frete DECIMAL(10, 2),
  status_arquivo INT,
  arquivo BYTEA,
  status_envio INT,
  status_envio_descricao VARCHAR(255),
  array_produtos TEXT[],
  status_pedido INT,
  peso_total VARCHAR(100),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user_cpf) REFERENCES tbl_ent(cpf)
)
`.then(() => {
  console.log("Tabela criada!");
});*/


/**sql`DROP TABLE IF EXISTS tbl_pedido`.then(() => {
  console.log("Tabela Excluida!");
}); */


/**sql`
CREATE TABLE teste (
  id TEXT PRIMARY KEY,          -- Chave primária autoincremental
  title varchar(200),
  array_produtos JSON DEFAULT NULL
);
`.then(() => {
  console.log("Tabela criada!");
}); */

/*sql`

CREATE TABLE order_details (
  id TEXT PRIMARY KEY,          -- Chave primária autoincremental
  title varchar(200),
  product_details JSON DEFAULT NULL
);
`.then(() => {
  console.log("Tabela criada!");
});*/

/*sql`
create table orders(
  id TEXT PRIMARY KEY, 
  uuid varchar(200) NOT NULL,
  storeId int NOT NULL,
  product JSON DEFAULT NULL,
  quantity int,
  price DECIMAL(10,2) DEFAULT 0.00
  );
`.then(() => {
  console.log("Tabela criada!");
});*/


/**sql`

CREATE TABLE tbl_pedido (
  id_pedido TEXT PRIMARY KEY,

  id_user_cpf VARCHAR(11), -- com o id_cpf eu vou trazer todas as informações do usuário, endereço e dados pessoais

  forma_pagamento VARCHAR(50),
  status_pagamento VARCHAR(50),
  frete DECIMAL(10, 2),
  valor_frete DECIMAL(10, 2),
  status_arquivo INT,
  arquivo BYTEA,
  status_envio INT,
  status_envio_descricao VARCHAR(255),

  array_produtos JSON DEFAULT NULL,  -- array[id_prod, decricao, qnt, vl_preco ]

  status_pedido INT,
  peso_total DECIMAL(10, 2),
  valor_total DECIMAL(10, 2),

  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user_cpf) REFERENCES tbl_ent(cpf)
)
`.then(() => {
  console.log("Tabela criada!");
}); */








sql`

CREATE TABLE tbl_produtos (
    id_prod TEXT PRIMARY KEY,
    nome_prod VARCHAR(100) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    classificacao VARCHAR(30) NOT NULL,
    img VARCHAR(5000) NOT NULL,
    id_categoria INT,
    preco DECIMAL(10,2) NOT NULL, -- Usando DECIMAL para armazenar valores monetários
    qnt INT NOT NULL,
    qnt_em_estoque INT NOT NULL,
    peso DECIMAL(10,2), -- Assumindo que peso é uma medida monetária
    desconto INT NOT NULL,
    preco_desconto DECIMAL(10,2), -- Usando DECIMAL para armazenar valores monetários
    qnt_parcelas INT NOT NULL,
    juros_parcela DECIMAL(5,2) NOT NULL, -- Taxa de juros em percentual, por exemplo, 5.2%.
    valor_parcela DECIMAL(10,2), -- Usando DECIMAL para armazenar valores monetários
    frete INT NOT NULL, -- Indica se há cobrança de frete (1 para sim, 0 para não)
    valor_frete DECIMAL(10,2) NOT NULL, -- Usando DECIMAL para armazenar valores monetários
    fav_auth INT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id_cat)

);
`.then(() => {
  console.log("Tabela criada!");
});









