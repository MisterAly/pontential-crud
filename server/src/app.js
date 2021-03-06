const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");

const middlewares = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


module.exports = app;
