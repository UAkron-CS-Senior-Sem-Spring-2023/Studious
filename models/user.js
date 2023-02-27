// model for user schema mongodb object
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);