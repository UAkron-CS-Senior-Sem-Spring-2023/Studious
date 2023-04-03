import dbConnect from '../../../utils/dbConnect';
import TaskEntry from '../../../models/taskEntry';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // getting the email from the query string
                const { email } = req.query;
                const classEntries = await  TaskEntry.find({ userEmail: email });
                res.status(200).json({ success: true, data: TaskEntries });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                
                const classEntry = await TaskEntry.create(req.body);
                res.status(201).json({ success: true, data: TaskEntry });
                break;
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
    }
}