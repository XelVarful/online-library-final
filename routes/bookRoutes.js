const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { auth, admin } = require('../middleware/auth');

router.get('/', async (req, res) => {
    const books = await Book.find().populate('author');
    res.json(books);
});

router.post('/', auth, admin, async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', auth, admin, async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;