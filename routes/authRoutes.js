/* Routes for auth */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connected to database')
}).catch((error) => {
    console.error('Error when connecting to database')
});

// User model
const User = require('../models/User');

// Add a new user
router.post('/register', async (req, res) => {
    try {
        const {email, password } = req.body;

        // Validate input
        if(!email || !password) {
            return res.status(400).json({error: 'Invalid input, send email, password, firstname and lastname'});
        }

        // Correct - saver user
        const user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: 'User created'});
        
    } catch (error) {
        res.status(500).json({error: 'Server error'});
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const {email, password } = req.body;

        // Validate input
        if(!email || !password) {
            return res.status(400).json({error: 'Invalid input, send email and password'});
        }

        // Check credentials
        
        // Does user exists?
        const user = await user.findOne({ email });
        if(!user) {
            return res.status(401).json({ error: 'Incorrect email or password'});
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password'});
        } else {
            res.status(200).json({ message: 'User loged in!'})
        }

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});


module.exports = router;