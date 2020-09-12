# CRUD Gazin

![Login](/imgs/login.jpg)

![Devs](/imgs/devs.jpg)

## Descrição

  Aplicação do processo seletivo Gazin com API REST com uso de Node.Js e FrontEnd com uso de React.Js

## Tabela de conteúdos
   * [Descrição](#descrição)
   * [Funcionalidades](#funcionalidades)
   * [Pré-Requesitos](#pré-requisitos)
   * [Funcionamento](#funcionamento)
   * [Testes](#testes)
   * [Autor](#autor)

## Funcionalidades

  * Autenticação JWT
  * Adicionar desenvolvedor
  * Editar desenvolvedor
  * Deletar desenvolvedor
  * Listar todos desenvolvedores
  * Listar todos desenvolvedores por página e query params
  * Página Web que consuma todas estas rotas
  * Padrões UI/UX


## Pré-Requisitos

* Instalar o [Docker Desktop](https://docs.docker.com/get-docker/).

* Ter o [MongoDB](https://docs.mongodb.com/manual/installation/) rodando no sistema (Community Edition - Versão Server)

## Funcionamento
 
Para criar o container a partir da imagem, execute:

    docker build -f application.dockerfile -t beavanzi/dockernode .

Para rodar o container, execute:

    docker run -p 5000:5000 -d --name crud beavanzi/dockernode

`Caso a porta 5000 esteja em uso, mapeie outra em "outra_porta_local:5000"`

Com isso, o container estará rodando, e uma tabela 'desenvolvedores' será criada nos arquivos do container. Você poderá fazer as requisições na API usando Insomnia, Postman, etc.

Para parar a execução do container, execute:

    docker stop crud

Com o container parado, você pode removê-lo usando:

    docker rm crud

## Testes

Os testes unitários e de integração foram escritos utilizando o Jest e o Supertest. Eles são rodados quando o container é iniciado (é mostrado nos logs do container), mas podem ser executados quando desejar (em uma máquina com NodeJs instalado) com o comando:

    npm test


## Autor

* **Hugo Fusinato**: @hugohvf (https://github.com/hugohvf)
* [![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=www.linkedin.com/in/beatriz-a-310079115/)](https://www.linkedin.com/in/hugo-fusinato/)