const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const users = require('../../Users');

// Gets All Users
router.get('/', (req, res) => res.json(users));

// Get Single Member
router.get('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({
            msg: `No user with the id of ${req.params.id}`
        });
    }
});

// Create User
router.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        status: 'active'
    };
    if (!newUser.name || !newUser.username || !newUser.email) {
        res.status(400).json({
            msg: 'Please include a name, username and email'
        });
    }
    users.push(newUser);
    // res.json(users);
    res.redirect('/');
});

// Update User
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        const updUser = req.body;
        users.forEach(user => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updUser.name ? updUser.name : user.name;
                user.username = updUser.username
                    ? updUser.username
                    : user.username;
                user.email = updUser.email ? updUser.email : user.email;

                res.json({ msg: 'User updated', user });
            }
        });
    } else {
        res.status(400).json({
            msg: `No user with the id of ${req.params.id}`
        });
    }
});

// Delete User
router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'User Deleted',
            users: users.filter(user => user.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({
            msg: `No user with the id of ${req.params.id}`
        });
    }
});

module.exports = router;
