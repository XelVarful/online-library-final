const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        const user = new User({ ...req.body, password: hashed });
        await user.save();
        res.status(201).json({ message: "Registered" });
    } catch (e) { res.status(400).json({ message: "Error or email taken" }); }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({ message: "Wrong credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token, role: user.role, username: user.username });
    } catch (e) { res.status(500).json({ message: "Server error" }); }
});

module.exports = router;