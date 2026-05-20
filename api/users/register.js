// POST /api/users/register
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/userSchema');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email and password are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with that email already exists.' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const userObj = newUser.toObject();
        delete userObj.password;

        return res.status(201).json(userObj);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }

        const passwordIsValid = await user.isCorrectPassword(password);
        if (!passwordIsValid) {
            return res.status(400).json({ message: 'Incorrect email or password.' });
        }

        const payload = { id: user._id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', {
            expiresIn: '1h',
        });

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({ token, user: userObj });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;