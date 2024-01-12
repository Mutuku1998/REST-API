const express = require('express');
const connection = require('../connection.js');
const bcrypt = require('bcrypt')
const router = express.Router();
router.post('/user', async (req, res, next) => {
    const saltRounds = 10;

    try {
        const password = req.body.password;    
const encryptedPassword = await bcrypt.hash(password, saltRounds)

        const sql = 'INSERT INTO registration (name, email, password) VALUES(?,?,?)';
        const values = [
            [req.body.name, req.body.email,encryptedPassword]
        ];

        connection.query(sql, [values], (err, data) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: 'Error inserting data into the database' });
            }
            return res.status(200).json({ success: true, data: data });
        });
    } catch (error) {
        console.error('Hashing Error:', error);
        return res.status(500).json({ error: 'Error hashing the password' });
    }
});


module.exports = router;
