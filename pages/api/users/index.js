import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/user';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method) {
        // get all users in the database
        case 'GET':
            try {
                const users = await User.find({}); 
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        // add a user to the database
        case 'POST':
            try {
                const user = await User.create(req.body);

                res.status(201).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // invalid route, error
        default:
            res.status(400).json({ success: false });
    }
}