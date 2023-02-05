const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await  User.find();
        res.json(users);
    } catch (err) {
        res.json( {message: err})
    }
});

router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// POST: adding a new user to the system
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name
    })

    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (err) {
        res.status({ message: err.message});
    }
})

module.exports = router;
