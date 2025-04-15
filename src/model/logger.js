const mongoose = require('mongoose');

const Logger = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Logger', Logger);