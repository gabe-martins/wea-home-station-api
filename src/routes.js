const { Router } = require("express");
const DailyController = require('./controllers/DailyController');

const routes = Router();

// Rotas do CRUD
routes.post('/daily', DailyController.store);
routes.get('/daily', DailyController.index);

module.exports = routes;