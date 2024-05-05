const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes)

const port = process.env.PORT || 3000;

// Routes
app.use('/api', authRoutes);

// Protected routes
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Skyddad route' });
});

// Validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({ message: 'Not authorized for this route - token is missing!'});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) return res.status(403).json({ massage: 'Invalid JWT!'});

        req.email = email;
        next();
    })

}

// Start application
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})