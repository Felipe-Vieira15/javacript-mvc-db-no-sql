const controller = require('../controller/taskController');

class TaskApi {
    async criarTarefa(req, res) {
        const titulo = req.body.titulo;
        const status = req.body.status;
        const usuario_id = req.body.usuario_id;
        const projeto_id = req.body.projeto_id;

        try {
            const task = await controller.criarTarefa(titulo, status, usuario_id, projeto_id);
            return res.status(201).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async alterarTarefa(req, res) {
        const { id } = req.params;
        const { titulo, status, usuario_id, projeto_id } = req.body;

        try {
            const task = await controller.alterarTarefa(Number(id), titulo, status, usuario_id, projeto_id);
            return res.status(200).send(task);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    async deletarTarefa(req, res) {
        const { id } = req.params; 

        try {
            await controller.deletarTarefa(Number(id));

            return res.status(200).json({ message: 'Tarefa deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    }

    async listarTarefa(req, res) {
        try {
            const tasks = await controller.listarTarefas();
            return res.status(200).send(tasks);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new TaskApi();