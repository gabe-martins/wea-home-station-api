const { Router } = require("express");
const DailyController = require('./controllers/DailyController');
const AuthController = require('./controllers/AuthController');
const auth = require('./middlewares/auth');

const routes = Router();

// Rota para gerar token
routes.post('/generate-token', AuthController.generateToken);

// Rotas do CRUD protegidas
routes.post('/daily', auth, DailyController.store);
routes.get('/daily', auth, DailyController.index);
routes.get('/daily/average', auth, DailyController.getAverageLastHour);

module.exports = routes;