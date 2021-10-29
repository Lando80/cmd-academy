# CMD Academy

## Ferramentas necessárias 🔧

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/) - v14.17.6
- [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) - v13.14

---

## Configuração do projeto 📜

### Após instalar as ferramentas necessárias siga o passo a passo abaixo

---

### 1. Rode o seguinte comando no Git Bash

    git clone https://github.com/Lando80/cmd-academy.git

ou

    Baixe o arquivo .zip do projeto aqui pelo GitHub

Lembre-se de verificar em qual branch você está fazendo isso

---

### 2. Baixe o arquivo `firebaseKey.json`

Abra o card de 🔗 Links clicando [aqui](https://trello.com/c/ymqOXQ11)

Baixe o arquivo `firebaseKey.json`

Mova o arquivo para dentro da pasta `config`, deixando assim

    📁src
     |-- 📁config
       |-- cors.json
       |-- database.js
       |-- firebaseKey.json
       |-- multer.js

---

### 3. Crie seu banco de dados local

Rode o seguinte comando pelo terminal

    psql -U postgres

Em seguida, digite a senha que você utilizou durante a instalação do PostgreSQL

Agora rode o comando

    CREATE DATABASE cmd;

Para listar os bancos criados utilize

    \l

Para se conectar com o banco criado

    \c cmd

Após se conectar com o banco você poderá listar as tabelas existentes por meio do

    \dt

---

### 4. Copie e cole o arquivo _`.env.exemple`_ e altere o nome da cópia para _`.env`_

⚠ É extramente necessário que você faça esse passo
corretamente ⚠

---

### 5. Configure seu arquivo _`.env`_ adicionando os seguintes itens

    HOST_DB = localhost

    PORT_DB = 5432

    USER_DB = postgres

    PASSWORD_DB = AQUI VOCÊ COLOCARÁ A MESMA SENHA QUE UTILIZOU DURANTE A INSTALAÇÃO DO POSTGRES

    DATABASE_NAME = cmd

---

### 6. Abra a pasta do projeto pelo seu editor de código ou pelo terminal

Caso esteja utilizando o Visual Studio Code, aperte

    Ctrl + J

Instale as dependências do projeto com

    npm i

Após a instalação das dependências você deverá rodar o comando

    npm run knex:migrate

E por último rodar o comando

    npm run dev

---

Se chegou até aqui o seu projeto deve estar configurado corretamente, então, `parabéns` 😎👍

Agora basta fazer requisições para a API utilizando o [Insomnia](https://insomnia.rest/download) ou o [Postman](https://www.postman.com/downloads/)

As rotas estão no arquivo `routes`, beleza?
