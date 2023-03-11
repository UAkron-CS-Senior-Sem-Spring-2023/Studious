import dbConnect from '../../../utils/dbConnect';
import ClassEntry from '../../../models/classEntry';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
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