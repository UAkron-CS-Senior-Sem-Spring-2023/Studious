import dbConnect from '../../../utils/dbConnect';
import TaskEntry from '../../../models/taskEntry';
import mongoose from 'mongoose';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // getting the email from the query string
                const { email } = req.query;
                const TaskEntries = await  TaskEntry.find({ userEmail: email });
                res.status(200).json({ success: true, data: TaskEntries });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const newTaskEntry = await TaskEntry.create(req.body);
                res.status(201).json({ success: true, data: newTaskEntry });
              } catch (error) {
                res.status(400).json({ success: false });
              }
              break;

        /*
        This put route is going to be used when a user adds a task from the taskbar on the right hand side to the schedule on the main page

        Request will look like this: http://localhost:3000/api/tasks/id (where ID is the _id field of the specific task)

        The body of the request will look like this
        {
        "startTime": "2023-04-09T12:00:00.000Z",
        "endTime": "2023-04-11T12:00:00.000Z"
        }
        */

        case 'PATCH':
            try {
                const { id } = req.query;
                const { startTime, endTime } = req.body;

                const updateTask = await TaskEntry.findOneAndUpdate(
                    { _id: id },
                    { startTime, endTime },
                    { new: true }
                );

                if (!updateTask) {
                    return res.status(404).json({ success: false, message: 'Task not found' })
                }

                res.status(200).json({ success: true, data: updateTask });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Server error' });
            }
            break;

        default:
            res.status(400).json({ success: false, message: 'Invalid request method' });
    }
}