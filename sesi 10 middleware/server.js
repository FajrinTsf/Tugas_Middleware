const express = require('express');
const bodyParser = require('body-parser');
const mahasiswaController = require('./controllers/mahasiswaController');

const app = express();
const PORT = 3000;

// Middleware untuk memproses JSON
app.use(bodyParser.json());

// Middleware Logger
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
});

// Middleware User Auth (contoh sederhana)
const authMiddleware = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (authToken === 'valid-token') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }
};

// Endpoint untuk mengelola data mahasiswa
app.use('/mahasiswa', mahasiswaController);

// Endpoint khusus untuk menambahkan data mahasiswa dengan middleware auth
app.post('/mahasiswa', authMiddleware, (req, res) => {
    const newStudent = req.body;
    // Simpan data mahasiswa baru
    res.status(201).json({ message: 'Student added successfully', data: newStudent });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});