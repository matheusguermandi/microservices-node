# Microservices NodeJS + TypeScript

***

## <i>Rest API</i>

A aplicação **./restapi** é responsável por gerenciar toda parte de usuários e requisições aos outros microservices. 

**Funcionalidades**
- Gerenciamento de usuários
- Autenticação JWT e Rate limite
- Gerenciamento das requisições para o microservice de Carrinho
- Gerenciamento das requisições para o microservice de Produto

**Entity**
<br/>
<br/>
<img src="https://raw.githubusercontent.com/matheusguermandi/microservices-node/master/_assets/apirest.jpeg?token=AGUMDXIHNMP6S3A2XUUIAQLAUO33S" height="300">
<br/>

**EndPoints (Users + Session)**

Rotas | Método  | Descrição
------|-------- |--------
http://localhost:3333/sessions| POST | Realiza autenticação
http://localhost:3333//users/list| GET | Lista usuários
http://localhost:3333/users/:id| GET | Busca usuário
http://localhost:3333/users| POST | Cadastra usuário
http://localhost:3333/users/:id| PUT | Atualiza usuário
http://localhost:3333/users/:id| DELETE | Exclui usuário 

<br/>

**EndPoints (Product Microservice)**
Rotas | Método  | Descrição
------|-------- |--------
http://localhost:3333/products| GET | Lista produtos
http://localhost:3333/products/:id| GET | Busca produto
http://localhost:3333/products| POST | Cadastra produto
http://localhost:3333/products/:id| PUT | Atualiza produto
http://localhost:3333/products/:id| DELETE | Exclui produto 

<br/>

**EndPoints (Cart Microservice)**
Rotas | Método  | Descrição
------|-------- |--------
http://localhost:3333/carts/:id| GET | Busca carrinho
http://localhost:3333/carts| POST | Cadastra carrinho
http://localhost:3333/carts/product| PUT | Adiciona produto no carrinho
http://localhost:3333/carts/product/:cart_id/:product_id| DELETE | Exclui produto do carrinho 

<br>

***

## <i>Cart Microservice</i> 

O microservice **./ms-cart** é responsável por gerenciar toda regra de negócio de um carrinho de compra e seus produtos.  

**Funcionalidades**
- Gerenciamento de um carrinho 
- Gerenciamento dos produtos de um carrinho
- Efetividade nas regras de negócios em uma iteração de um carrinho

**Entities**
<br/>
<br/>
<img src="https://raw.githubusercontent.com/matheusguermandi/microservices-node/master/_assets/ms-cart.jpeg?token=AGUMDXP6UPS2H56FKM3YYSTAUO33Y" height="300">
<br/>

**Endpoints (Cart + Product Cart)**
Rotas | Método  | Descrição
------|-------- |--------
http://localhost:3334/cart/list| GET | Lista carrinhos
http://localhost:3334/cart/:id| GET | Busca carrinho
http://localhost:3334/cart| POST | Cadastra carrinho
http://localhost:3334/cart/:id| DELETE | Exclui carrinho
http://localhost:3334/product| POST | Adiciona produto no carrinho
http://localhost:3334/product/:id| PUT | Atualiza produto do carrinho
http://localhost:3334/product/:id| DELETE | Exclui produto do carrinho

<br>

***

## <i>Product Microservice</i>

O microservice **./ms-product** é responsável por gerenciar os produtos

**Funcionalidades**
- Gerenciamento de produtos 

**Entity**
<br/>
<br/>
<img src="https://raw.githubusercontent.com/matheusguermandi/microservices-node/master/_assets/ms-product.jpeg?token=AGUMDXI73AGODNYNOUGRR2TAUO334" height="300">
<br/>

**EndPoints**
Rotas | Método  | Descrição
------|-------- |--------
http://localhost:3335/products| GET | Lista produtos
http://localhost:3335/products/:id| GET | Busca produto
http://localhost:3335/products| POST | Cadastra produto
http://localhost:3335/products/:id| PUT | Atualiza produto
http://localhost:3335/products/:id| DELETE | Exclui produto 

<br>

***

# Instalação e execução

Para realizar a execução dos microservices é necessário possuir os seguintes serviços instalados: 

- NodeJS
    - https://nodejs.org/
- Yarn
    - https://yarnpkg.com/
- PostegreSQL
    - https://www.postgresql.org/
- MongoDB
    - https://www.mongodb.com/
- Redis
    - https://redis.io/
- Insomnia - Opcional
    - https://insomnia.rest/products/insomnia

### Docker

Você pode utilizar alguns desses serviços a partir de um container docker, no caso segue os comandos

- PostegreSQL
    - docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 postgres
- MongoDB
    - docker run --name mongodb -p 27017:27017 -d -t mongo
- Redis 
    - docker run --name redis -p 6379:6379 -d -t redis:alpine

### Clonar e instalar dependências
- 1° Clone o projeto em seu computador com o seguinte comando 
    - ```git clone https://github.com/matheusguermandi/microservices-node```
- 2° Acesse a pasta com todos os projetos
    - ```cd microservices-node```
- 3° Acesse a aplicação **apirest** e instale suas dependências
    - ```cd apirest```
    - ```yarn install```
    - ```cd ..```
- 4° Acesse o microservice **ms-cart** e instale suas dependências
    - ```cd ms-cart```
    - ```yarn install```
    - ```cd ..```
- 5° Acesse o microservice **ms-product** e instale suas dependências
    - ```cd ms-product```
    - ```yarn install```
    - ```cd ..```

***
### Executar Aplicação - Api REST
- 1° Acesse a aplicação **apirest** 
    - ```cd apirest```
- 2° Crie um banco de dados Postgres e atualize o arquivo ```ormconfig.json``` com as credenciais corretas 
- 3° Execute as migrations do banco 
    - ```yarn typeorm migration:run```
    - **Obs.:** o usuário: root@root.com || root123! foi criado
- 4° Execute o microservice
    - ```yarn server```
- 5° Realize a autenticação na rota http://localhost:3333/sessions
- 6º Utilize o token (**Bearer Token**) para realizar as requisições seguintes

### Executar testes - Api REST
- 1° Acesse a pasta da aplicação **apirest** 
    - ```cd apirest```
- 2° Execute os testes
    - ```yarn jest```
- 3° Acesse o arquivo ```index.html``` na pasta ./coverage

***

### Executar Microservice - Cart
- 1° Acesse a pasta do microservice **ms-cart** 
    - ```cd ms-cart```
- 2° Crie um banco de dados Postgres e atualize o arquivo ```ormconfig.json``` com as credenciais corretas 
- 3° Execute as migrations do banco 
    - ```yarn typeorm migration:run```
- 4° Execute o microservice
    - ```yarn server```

***

### Executar Microservice - Product
- 1° Acesse a pasta do microservice **ms-product** 
    - ```cd ms-product```
- 2° Execute o microservice
    - ```yarn server```

<br>

***

# Importar rotas para o Insomnia

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Microservice%20-%20NodeJS&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmatheusguermandi%2Fmicroservices-node%2Fmaster%2FInsomnia_2021-05-10%3Ftoken%3DAGUMDXMLBLOMVYKKQTUCJZ3AUMWGM)