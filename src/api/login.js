const controller = require('../controller/loginController');
const jwt = require('jsonwebtoken');

    async function login(req, res) {
        const { username, password } = req.body;
        const user = await controller.getUser(username, password);
        if (user) {
            // Generate a token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }

    validarToken = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.userId = decoded.id;
            next();
        });
    }