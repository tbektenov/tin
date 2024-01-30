const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { authMiddleWare } = require('../../public/js/middlewares');

const userLayout = '../views/layouts/user';

/**
 * LOGIN
 * GET: page
 */
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

/**
 * LOGIN
 * POST: user
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        let existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        let isValidPassword = await bcrypt.compare(password, existingUser.password);

        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid p' });
        }

        let token = jwt.sign({
            userId: existingUser._id,
            isAdmin: existingUser.isAdmin,
        },'AbiyDyadyaZaChtosh');

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

/**
 * REGISTRATION
 * GET: page
 */
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

/**
 * REGISTRATION
 * POST: user
 */
router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, email, password: hashedPassword });
            res.redirect('/login');
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ error: 'User already in use' });
            }
            res.status(500).json({ error: 'Server error' });
            
        }
        
    } catch (error) {
        console.error(error);
    }
});

router.get('/admin',authMiddleWare , async (req, res) => {
    try {
        var details = {
            title: "Admin Page",
            description: "Admin's page"
        }

        let writers = await Author.find().sort({ name: 1 });

        if (req.isAdmin) {
            res.render('user/admin', { details, layout: userLayout, writers });
        } else {
            res.send('Not an admin');    
        }

    } catch (error) {
        console.error(error);
    }
}); 

router.get('/add-writer',authMiddleWare , async (req, res) => {
    try {
        var details = {
            title: "Add writer",
            description: "Admin's page"
        }

        if (req.isAdmin) {
            res.render('user/add-writer',
            {
                details
            });
        } else {
            res.send('Not an admin');    
        }

    } catch (error) {
        console.error(error);
    }
}); 

router.post('/add-writer',authMiddleWare , async (req, res) => {
    try {
        var details = {
            title: "Add writer",
            description: "Admin's page"
        }

        if (req.isAdmin) {
            try {
                let newAuthor = new Author({
                    name: req.body.wname,
                    bio: req.body.wbio,
                    netWorth: req.body.netWorth
                });

                await Author.create(newAuthor);
                res.redirect('/admin');
            } catch (error) {
                console.error(error);
            }
        } else {
            res.send('Not an admin');    
        }

    } catch (error) {
        console.error(error);
    }
}); 

router.get('/edit-writer/:id',authMiddleWare , async (req, res) => {
    try {
        var details = {
            title: "Edit writer",
            description: "Admin's page"
        }

        if (req.isAdmin) {
            let writer = await Author.findOne({ _id: req.params.id });
            res.render('user/edit-writer',
            {
                details,
                writer
            });
        } else {
            res.send('Not an admin');    
        }

    } catch (error) {
        console.error(error);
    }
}); 

router.put('/edit-writer/:id',authMiddleWare , async (req, res) => {
    try {
        var details = {
            title: "Edit writer",
            description: "Admin's page"
        }

        if (req.isAdmin) {
            try {
                await Author.findByIdAndUpdate(req.params.id, {
                    name: req.body.wname,
                    bio: req.body.wbio,
                    netWorth: req.body.netWorth
                });

                res.redirect('/admin');
            } catch (error) {
                console.error(error);
            }
        } else {
            res.send('Not an admin');    
        }

    } catch (error) {
        console.error(error);
    }
}); 

module.exports = router;