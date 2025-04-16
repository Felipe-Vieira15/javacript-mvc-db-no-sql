const controller = require('../controller/userController');

class Login {
    // Login do usuário
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await controller.login(email, senha);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    // Middleware para validar token
    async validarToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            await controller.validarToken(token);
            next(); // Continua para o próximo middleware ou rota
        } catch (error) {
            return res.status(401).send({ error: 'Token inválido ou expirado' });
        }
    }
}

module.exports = new Login();
