/* Routes for auth */

const express = require('express');
const router = express.Router();

// Add a new user
router.post('/register', async (req, res) => {
    try {
        const {email, password } = req.body;

        // Validate input
        if(!email || !password) {
            return res.status(400).json({error: 'Invalid input, send email and passowrd'});
        }

        // Correct - saver user
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
            return res.status(400).json({error: 'Invalid input, send email and passowrd'});
        }

        // Check credentials
        if(email === 'adahl.gorling@gmail.com' && password === 'password') {
            res.status(200).json({ message: 'Login successful!'});
        } else {
            res.status(401).json({ error: 'Invalid email/password'});
        }

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});


module.exports = router;