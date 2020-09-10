const express = require("express");

const routes = express.Router();
const middlewares = require("./middlewares");

const DevelopersController = require("./controllers/DevelopersController");
const AuthenticationController = require("./controllers/AuthenticationController");


routes.get("/", (req, res) => {
  res.json({
    message: "🏬🚚🎁✔ Gazin",
  });
});

// Autentica usuário
routes.post("/token", AuthenticationController.authenticate);

// Middleware para exigir autenticações nas requisições
if(process.env.NODE_ENV === 'test') middlewares.authorizationAttribute = (req, res, next) => next();

// Retorna todos os devs
routes.get("/developers", middlewares.authorizationAttribute, DevelopersController.show);

// Retorna todos os devs de acordo com query string e paginação
routes.get("/developers?", middlewares.authorizationAttribute, DevelopersController.show);

// Retorna os dados de um dev
routes.get("/developers/:id", middlewares.authorizationAttribute, DevelopersController.index);

// Adiciona um novo dev
routes.post("/developers/", middlewares.authorizationAttribute, DevelopersController.create);

// Atualiza os dados de um dev
routes.put("/developers/:id", middlewares.authorizationAttribute, DevelopersController.update);

// Apaga o registro de um de um dev
routes.delete("/developers/:id", middlewares.authorizationAttribute, DevelopersController.destroy);



module.exports = routes;
