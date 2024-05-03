const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/api', authRoutes)

const port = process.env.PORT || 3000;

// Start application
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
})