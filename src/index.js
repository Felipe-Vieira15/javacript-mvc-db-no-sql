const express = require('express');
const userApi = require('./api/user');
const projectApi = require('./api/project');
const taskApi = require('./api/task');
const database = require('./config/database');

/**
 * Instalações necessárias:
 * npm install express
 * npm install sequelize
 * npm install pg
 * npm install pg-hstore
 * npm install bcrypt
 * npm install jsonwebtoken
 * npm install dotenv
 * npm install cors
 * npm install mysql2
 * npm install mongoose
 */
console.log('Starting server....')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
})
app.post('/login', userApi.login);
app.post('/users', userApi.criarUsuario);
app.post('/projects', projectApi.criarProjeto);
app.post('/tasks', taskApi.criarTarefa);


// Aplica a validação do token para as rotas abaixo
app.use(userApi.validarToken);
app.get('/users', userApi.listarUsuario);
app.put('/users/:id', userApi.alterarUsuario);
app.delete('/users/:id', userApi.deletarUsuario);
app.get('/projects', projectApi.listarProjeto);
app.put('/projects/:id', projectApi.alterarProjeto);
app.delete('/projects/:id', projectApi.deletarProjeto);
app.get('/tasks', taskApi.listarTarefa);
app.put('/tasks/:id', taskApi.alterarTarefa);
app.delete('/tasks/:id', taskApi.deletarTarefa);


database.db.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

