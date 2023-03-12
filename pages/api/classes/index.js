import dbConnect from '../../../utils/dbConnect';
import ClassEntry from '../../../models/classEntry';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // getting the email from the query string
                const { email } = req.query;
                const classEntries = await  ClassEntry.find({ userEmail: email });
                res.status(200).json({ success: true, data: classEntries });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                
                const classEntry = await ClassEntry.create(req.body);
                res.status(201).json({ success: true, data: classEntry });
                break;
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
    }
}