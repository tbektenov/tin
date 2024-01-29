const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLayout = '../views/layouts/user';

router.get('/login', async (req, res) => {
    try {
        var details = {
            title: "Login",
            description: "Login page"
        }

        res.render('user/login', { details, layout: userLayout});
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        let existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ error: 'No such username' });
        }

        
    } catch (error) {
        console.log(error);
    }
});

router.get('/register', async (req, res) => {
    try {
        var details = {
            title: "Register",
            description: "Registration page"
        }

        res.render('user/register', { details, layout: userLayout});
    } catch (error) {
        console.log(error);
    }
});

router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, email, password: hashedPassword });
            res.status(201).json({ message: 'User Created', user });
            res.redirect('/login');
        } catch (error) {
            if(error.code === 11000) {
                res.status(409).json({ message: 'User already in use' });
            }
            res.status(500).json({ message: 'Server error' });
        }
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;