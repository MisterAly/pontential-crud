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
routes.use(middlewares.authorizationAttribute);

// Retorna todos os devs
routes.get("/developers", DevelopersController.show);

// Retorna todos os devs de acordo com query string e paginação
routes.get("/developers?", DevelopersController.show);

// Retorna os dados de um dev
routes.get("/developers/:id", DevelopersController.index);

// Adiciona um novo dev
routes.post("/developers/", DevelopersController.create);

// Atualiza os dados de um dev
routes.put("/developers/:id", DevelopersController.update);

// Apaga o registro de um de um dev
routes.delete("/developers/:id", DevelopersController.destroy);



module.exports = routes;
