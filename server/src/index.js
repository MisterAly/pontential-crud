const app = require('./app');

const port = process.env.HOST_PORT || 5000;

app.listen(port, () => {
  console.log(`Escutando em: http://localhost:${port}`);
});
