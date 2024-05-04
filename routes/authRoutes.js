/* Routes for auth */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
        const {email, password, firstname, lastname } = req.body;

        // Validate input
        if(!email || !password || !firstname || !lastname) {
            return res.status(400).json({error: 'Invalid input, send email, password, firstname and lastname'});
        }

        // Correct - saver user
        const user = new User({ email, password, firstname, lastname });
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
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ error: 'Incorrect email or password'});
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password'});
        } else {
            // Create JWT
            const payload = { email: email };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
            const response = {
                message: 'User loged in!',
                token: token
            }
            res.status(200).json({ response });
        }

    } catch (error) {
        
        res.status(500).json({ error: "Server error"});
    }
});


module.exports = router;