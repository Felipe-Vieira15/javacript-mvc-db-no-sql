const controller = require('../controller/userController');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'lipeee';

class LoginApi {
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

    // Método para validar o token
    async validarToken(req, res, next) {
        const authHeader = req.headers['authorization'];
    
        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }
    
        const parts = authHeader.split(' ');
    
        if (parts.length !== 2) {
            return res.status(401).json({ error: 'Formato do token inválido' });
        }
    
        const [scheme, token] = parts;
    
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: 'Token mal formatado' });
        }
    
        try {
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            req.userId = payload.id;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    }
    
}

module.exports = new LoginApi();
