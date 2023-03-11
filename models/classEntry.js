// model for adding classes to the schedule
const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    className: {
        type: String,
        required: [true, 'Please add a class name'],
    },
    classLocation: {
        type: String,
        required: false,
    },
    userEmail: {
        type: String,
        required: false,
    },
    startTime: {
        type: Date,
        required: [true, 'Please add a start time'],
    },
    endTime: {
        type: Date,
        required: [true, 'Please add an end time'],
    },
    days: {
        type: [String],
        required: [true, 'Please add days for the class'],
    },
    color: {
        type: String,
        required: [true, 'Please add a color'],
    }
});

module.exports = mongoose.model('ClassEntry', ClassSchema);