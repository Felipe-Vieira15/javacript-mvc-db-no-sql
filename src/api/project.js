const controller = require('../controller/projectController');

class ProjectApi {
    async criarProjeto(req, res) {
        const nome = req.body.nome;
        const descricao = req.body.descricao;

        try {
            const project = await controller.criarProjeto(nome, descricao);
            return res.status(201).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async alterarProjeto(req, res) {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        try {
            const project = await controller.alterarProjeto(Number(id), nome, descricao);
            return res.status(200).send(project);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async deletarProjeto(req, res) {
        const { id } = req.params; 

        try {
            await controller.deletarProjeto(Number(id));

            return res.status(200).json({ message: 'Projeto deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }

    async listarProjeto(req, res) {
        try {
            const projects = await controller.listarProjetos();
            return res.status(200).send(projects);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new ProjectApi();