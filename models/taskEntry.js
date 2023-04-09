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
    taskPriority: {
        type: Number,
        required: false,
    }
    ,    
    userEmail: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: false,
    },
    endTime: {
        type: Date,
        required: false,
    },
    color: {
        type: String,
        required: [true, 'Please add a color'],
    },
    timeEstimate: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.models.TaskEntry || mongoose.model('TaskEntry', TaskSchema);