const express = require('express');
const router = express.Router();
const registerRouter = require('../api/users/register');
const loginRouter = require('../api/users/login');

// Mock database placeholder
let users = [];

// GET all users
router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: users });
});

// GET a specific user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
});

// POST create a new user
router.post('/', (req, res) => {
    const { name, email } = req.body || {};
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Please provide name and email' });
    }
    const newUser = { id: Date.now().toString(), name, email };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
});

// PUT update an entire user resource
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.status(200).json({ success: true, data: user });
});

// DELETE remove a user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
});

// Mount register routes from api/users/register.js
router.use('/', registerRouter);

// Mount login routes from api/users/login.js
router.use('/', loginRouter);

module.exports = router;
