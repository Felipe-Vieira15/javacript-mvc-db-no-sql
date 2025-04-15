const database = require('../config/database');
const User = require('../model/user');
const Project = require('../model/project');

class Task {
    constructor() {
        this.model = database.db.define('tasks', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.db.Sequelize.STRING
            },
            status: {
                type: database.db.Sequelize.STRING
            }
        });
        this.model.belongsTo(User, { foreignKey: 'usuario_id' });
        this.model.belongsTo(Project, { foreignKey: 'projeto_id' });
    }
}

module.exports = (new Task).model;