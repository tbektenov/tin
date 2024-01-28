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
    
    let data = {
        header: req.t('about-header'),
        body: req.t('about-body')
    }

    res.render('about', { details, data});
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

//function to populate database

// function populate() {
//     Author.insertMany([
//         {"name":"J.K.Rowling",
//         "bio":"Joanne Rowling was born on 31st July 1965 at Yate General Hospital near Bristol, and grew up in Gloucestershire in England and in Chepstow, Gwent, in south-east Wales."},
//         {"name":"S.King","bio":"Stephen Edwin King (born September 21, 1947) is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Called the 'King of Horror', his books have sold more than 350 million copies as of 2006, and many have been adapted into films, television series, miniseries, and comic books."},
//         {"name":"Ch.Palahniuk","bio":"Charles Michael 'Chuck' Palahniuk is an American novelist who describes his work as transgressional fiction. He has published 19 novels, three nonfiction books, two graphic novels, and two adult coloring books, as well as several short stories. His first published novel was Fight Club, which was adapted into a film of the same title."},
//         {"name":"Ch.Aitmatov","bio":"Chinghiz Torekulovich Aitmatov was a Kyrgyz author who wrote mainly in Russian, but also in Kyrgyz. He is one of the best known figures in Kyrgyzstan's literature."},
//         {"name":"P.Suskind","bio":"Patrick Süskind is a German writer and screenwriter, known best for his novel Perfume: The Story of a Murderer, first published in 1985."},
//         {"name":"N.Gogol","bio":"Nikolai Vasilievich Gogol was a Russian novelist, short story writer, and playwright of Ukrainian origin."},
//         {"name":"A.Pushkin","bio":"Alexander Sergeyevich Pushkin was a Russian poet, playwright, and novelist of the Romantic era. He is considered by many to be the greatest Russian poet, as well as the founder of modern Russian literature."},
//         {"name":"M.Lomonosov","bio":"Mikhail Vasilyevich Lomonosov was a Russian polymath, scientist and writer, who made important contributions to literature, education, and science. Among his discoveries were the atmosphere of Venus and the law of conservation of mass in chemical reactions."}
//     ]);

//     Author.insertMany[
//         {"name":"IT"},
//         {"name":"Harry Potter and the Philosopher's Stone"}
//     ];
// }


module.exports = router;