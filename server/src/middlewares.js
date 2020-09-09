const jwt = require('jsonwebtoken');
const authConfig = require('./config/auth.json')

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Não encontrado - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

function authorizationAttribute(req, res, next) {
  const authHeader = req.headers.authorization;


  if(!authHeader)
    return res.status(401).send({ error: 'Nenhum token foi informado, autorize na rota /token' });

  const parts = authHeader.split(' ');

  if(!parts.length === 2)
    return res.status(401).send({ error: 'Token errado' });

    const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token mal formatado' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err) return res.status(401).send({ error: 'Token inválido' });

  return next();
  })
}

module.exports = {
  notFound,
  errorHandler,
  authorizationAttribute,
};
