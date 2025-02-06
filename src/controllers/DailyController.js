const Daily = require('../models/Daily');
const moment = require('moment-timezone');


module.exports = {
  async store(req, res) {
    let {
      temperature,
      humidity,
      date_time
    } = req.body;

    temperature = temperature !== undefined ? temperature : 999;
    humidity = humidity !== undefined ? humidity : 999;
    date_time = date_time !== undefined ? date_time : moment().format('YYYY-MM-DD HH:mm:ss');

    dados = await Daily.create({
      temperature,
      humidity,
      date_time
    })

    return res.status(200).send("Saved!")
  },

  async index(req, res) {
    try {
      const dados = await Daily.find().sort({ createdAt: -1 }).limit(120);
      res.status(200).json(dados);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getAverageLastHour(req, res) {
    try {
      // Calcula a data de uma hora atrás
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const oneHourAgoFormatted = moment(oneHourAgo)
        .tz('America/Sao_Paulo')
        .format('YYYY-MM-DD HH:mm:ss');

      // Pipeline de agregação para filtrar e calcular as médias
      const result = await Daily.aggregate([
        {
          $match: {
            date_time: { $gte: oneHourAgoFormatted }
          }
        },
        {
          $group: {
            _id: null,
            avgTemperature: { $avg: "$temperature" },
            avgHumidity: { $avg: "$humidity" }
          }
        }
      ]);

      if (result.length === 0) {
        return res.json({ avgTemperature: 0, avgHumidity: 0, hourAgo: 0 });
      }

      res.json({
        avgTemperature: result[0].avgTemperature,
        avgHumidity: result[0].avgHumidity,
        hourAgo: oneHourAgoFormatted
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}