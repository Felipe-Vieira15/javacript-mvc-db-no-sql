const Project = require('../model/project');

class ProjectController {
    async criarProjeto(nome, descricao) {
        if (nome === undefined || descricao === undefined) {
            throw new Error('Nome e descrição são obrigatórios');
        }

        // INSERT INTO projects (nome, descricao) VALUES (nome, descricao);
        const project = await Project.create({ nome, descricao });

        return project;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await Project.findByPk(id);

        if (!project) {
            throw new Error('Projeto não encontrado');
        }

        return project;
    }

    async alterarProjeto(id, nome, descricao) {
        if (id === undefined || nome === undefined || descricao === undefined) {
            throw new Error('Id, nome e descrição são obrigatórios');
        }

        const project = await this.buscarPorId(id);

        project.nome = nome;
        project.descricao = descricao;

        await project.save();

        return project;
    }

    async deletarProjeto(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const project = await this.buscarPorId(id);

        await project.destroy();

        return project;
    }

    async listarProjetos() {
        return Project.findAll();
    }
}

module.exports = new ProjectController();