const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');

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
        const { username, email, password, birthdate } = req.body;

        if (!username || !email || !password || !birthdate) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }
        
        console.log(req.body);

        // return res.json({ message: 'Registration successful.' });
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;