const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    generateToken(req, res) {
        const { apiKey } = req.body;

        // Verifica se a API key está correta
        if (apiKey !== process.env.API_KEY) {
            return res.status(401).send('Chave de API inválida');
        }

        const token = jwt.sign({}, SECRET_KEY);
        return res.status(200).json({token});
    }
};
