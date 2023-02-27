import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/user';

dbConnect();

export default async (req, res) => {
    const { method } = req;
    const { email, password } = req.body;

    switch (method) {
        case 'POST':
            try {
                const isReal = await User.findOne({ email, password });
                if (isReal) {
                    res.status(200).json({ exists: true });
                } else {
                    res.status(200).json({ exists: false });
                }
            } catch (error) {
                res.status(400).json({ success: false });
            }
    }
}