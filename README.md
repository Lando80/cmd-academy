# cmd-academy
## Projeto da Fabrica de Software - construção do website de Network da CMD ACADEMY
##

Equipes:


MÓDULO | FRONT-END | BACK-END
------------------------|-----------|---------
Login/Cadastro | Marcionílio / Lucas | Daniel / Rodrigo / David
Home | Alexandre / Jailma | Aytalon / Matheus / Rickson  
Notificações | Acácio / Antonio | Orlando / Ronildo 
Certificados | David / Marcos | Orlando / Ronildo 
Perfil Instrutor/Aluno | Edicléia / Ailton | Edicléia / Daniel
Agenda | Lucas / Alexandre / Marcionílio | Rodrigo / João Ricardo

<h1>Passo-a-Passo para configurar o projeto</h1>

<p align="center">
    1 - Clonar o repositório na sua Máquina.

    2 - Criar o banco de dados:
    
    No terminal digite: psql -U postgres
    Clique em enter, em seguida digite a senha que você utilizou durante a instalação do postgres;

    Em seguida digite: CREATE DATABASE cmd; → Aperte em enter;

    Para listar os bancos criados utilize o: \l;

    Para se conectar com algum banco criado: \c + o nome do banco. ex: "\c cmd"; 

    Após se conectar com o banco você poderá listar as tabelas por meio do: \dt;

    3-  Altere o arquivo .env.exemple para → .env

    4 -  Configure seu env adicionando os seguintes itens:

    HOST_DB = localhost

    PORT_DB = 5432

    USER_DB =  postgres

    PASSWORD_DB = AQUI VOCÊ COLOCARÁ A MESMA SENHA QUE UTILIZOU DURANTE A INSTALAÇÃO DO POSTGRES

    DATABASE_NAME = cmd

    5- Dentro da pasta do projeto no terminal:

    Você deverá rodar o comando → npm i; → para instalar todas as dependências

    Após a instalação das dependências você deverá rodar o comando → npm run knex:migrate
    
    E por último rodar o comando → npm run server
    Para startar o projeto
</p>