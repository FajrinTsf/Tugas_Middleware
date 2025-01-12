const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const studentRoutes = require('./routers/user_routers');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware Logger
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ${method} ${url}`);
    next();
};

app.use(loggerMiddleware);

// Middleware User Auth
const authMiddleware = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if (!authToken || authToken !== 'valid-token') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

// Gunakan middleware auth pada route yang memerlukan autentikasi
app.post('/api/add-data', authMiddleware, (req, res) => {
    // Logika untuk menambahkan data
    res.status(201).json({ message: 'Data added successfully' });
});

app.use('/api', studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});