const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.API_KEY;

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

    // Verifica se o cabeçalho de autenticação está presente
  if (!authHeader) {
    return res.status(401).send('Acesso negado. Nenhum token fornecido.');
  }

  // Verifica se o token é válido
  if (authHeader === SECRET_KEY) {
    next();
    // return res.status(200).send('Token válido');
  } else {
    return res.status(400).send('Token inválido');
  }
};