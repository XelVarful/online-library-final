const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const { auth, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
});

router.post('/', auth, admin, async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();
        res.status(201).json(author);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;