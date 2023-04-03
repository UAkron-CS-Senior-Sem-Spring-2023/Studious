// model for adding tasks to the schedule
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    TaskName: {
        type: String,
        required: [true, 'Please add a task name'],
    },
    taskDescription: {
        type: String,
        required: false,
    },    
    userEmail: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: [true, 'Please add a start time'],
    },
    endTime: {
        type: Date,
        required: [true, 'Please add an end time'],
    },
    color: {
        type: String,
        required: [true, 'Please add a color'],
    }
});

module.exports = mongoose.models.TaskEntry || mongoose.model('TaskEntry', TaskSchema);