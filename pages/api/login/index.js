import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/user';

dbConnect();

export default async (req, res) => {
    const { method } = req;
    const { email, password } = req.body;

    switch (method) {
        case 'POST':
            try {
                const currUser = await User.findOne({ email, password });
                if (currUser) {
                    res.status(200).json({ exists: true, first_name: currUser.first_name });
                } else {
                    res.status(200).json({ exists: false });
                }
            } catch (error) {
                res.status(400).json({ success: false });
            }
    }
}