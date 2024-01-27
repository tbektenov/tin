const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

/**
 * HOME
 */
router.get('', async (req, res) => {
    var details = {
        title: "Find your Writer",
        description: "Here you can add writers and their books."
    }
    
    res.render('index', { details });
});

/**
 * ABOUT
 */
router.get('/about', async (req, res) => {
    var details = {
        title: "About",
        description: "Page about us."
    }

    res.render('about', { details });
});

/**
 * WRITERS LIST
 */
router.get('/writers', async (req, res) => {
    var details = {
        title: "Writers",
        description: "Writers list."
    }

    try {
        const writers = await Author.find().sort({ name: 1 });
        res.render('writers', { details, writers });
    } catch (error) {
        console.log(error);
    }
});

/**
 * WRITER'S PAGE
 * GET: id
 */
router.get('/writers/:id', async (req, res) => {
    var details = {
        title: "Writer's page",
        description: "Writer's page."
    }

    try {
        let slug = req.params.id;

        const writer = await Author.findById({ _id: slug });
        const books = await Book.find({ author: slug });
        res.render('writer', { details, writer, books });
    } catch (error) {
        console.log(error);
    }
});

/**
 * SEARCH
 * POST: id
 */
router.post('/search', async (req, res) => {
    var details = {
        title: "Search",
        description: "Searching the author..."
    }

    try {
        let authorName = req.body.authorName.trim();

        // all writers who have such name or have such parameter in their name 
        const result = await Author.find({
            $or: [
                { name: authorName },
                { name: {$regex: new RegExp(authorName, 'i')}}
            ]
        }).sort({ name: 1 });

        if (!result.length) {
            res.render('search-failure', { details });
        } else {
            res.render('search-success', { details, result });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;