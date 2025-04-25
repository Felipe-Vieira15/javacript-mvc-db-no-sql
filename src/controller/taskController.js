const Task = require('../model/task');

class TaskController {
    async criarTarefa(titulo, status, usuario_id, projeto_id) {
        if (titulo === undefined || status === undefined || usuario_id === undefined || projeto_id === undefined) {
            throw new Error('Título, status, usuário e projeto são obrigatórios');
        }

        // INSERT INTO tasks (titulo, status, usuario_id, projeto_id) VALUES (titulo, status, usuario_id, projeto_id);
        const task = await Task.create({ titulo, status, usuario_id, projeto_id });

        return task;
    }

    async buscarPorId(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await Task.findByPk(id);

        if (!task) {
            throw new Error('Tarefa não encontrada');
        }

        return task;
    }

    async alterarTarefa(id, titulo, status, usuario_id, projeto_id) {
        if (id === undefined || titulo === undefined || status === undefined || usuario_id === undefined || projeto_id === undefined) {
            throw new Error('Id, título, status, usuário e projeto são obrigatórios');
        }

        const task = await this.buscarPorId(id);

        task.titulo = titulo;
        task.status = status;
        task.usuario_id = usuario_id;
        task.projeto_id = projeto_id;

        await task.save();

        return task;
    }

    async deletarTarefa(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const task = await this.buscarPorId(id);

        await task.destroy();

        return task;
    }

    async listarTarefas() {
        const tasks = await Task.findAll();

        if (!tasks) {
            throw new Error('Nenhuma tarefa encontrada');
        }

        return tasks;
    }

    async listarTarefasPorUsuario(usuario_id) {
        if (usuario_id === undefined) {
            throw new Error('Id do usuário é obrigatório');
        }

        const tasks = await Task.findAll({ where: { usuario_id } });

        if (!tasks) {
            throw new Error('Nenhuma tarefa encontrada para o usuário');
        }

        return tasks;
    }
}

module.exports = new TaskController();