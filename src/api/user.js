const controller = require('../controller/userController');

class UserApi {
    async criarUsuario(req, res) {
        const nome = req.body.nome
        const email = req.body.email;
        const senha = req.body.senha;

        try {
            const user = await controller.criarUsuario(nome, email, senha);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;

        try {
            const user = await controller.alterarUsuario(Number(id), nome, email, senha);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarUsuario(req, res) {
        const { id } = req.params;

        try {
            await controller.deletarUsuario(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarUsuario(req, res) {

        try {
            const users = await controller.listarUsuarios();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para login
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await controller.login(email, senha);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para validar o token
    async validarToken(req, res, next) {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            // Verifica se o token é válido e retorna o payload
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            req.userId = payload.id;
            next();
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = new UserApi();