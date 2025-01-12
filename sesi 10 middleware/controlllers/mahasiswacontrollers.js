const express = require('express');
const router = express.Router();
const db = require('../models/db');


router.get('/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


router.get('/mahasiswa/:nim', (req, res) => {
    const mahasiswaId = req.params.nim;
    db.query('SELECT * FROM mahasiswa WHERE nim = ?', [mahasiswaId], (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Mahasiswa not found' });
        } else {
            res.json(results[0]);
        }
    });
});


router.put('/mahasiswa/:nim', (req, res) => {
    const mahasiswaId = req.params.nim;
    const { nama, gender, prodi, alamat } = req.body;
    db.query('UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?',
        [nama, gender, prodi, alamat, mahasiswaId], (error) => {
            if (error) {
                console.error('Error updating mahasiswa:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Updating mahasiswa Successfully' });
            }
        });
});

module.exports = router;