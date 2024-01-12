const express = require('express');
const connection = require('../connection.js');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const router = express.Router();

router.post('/user', (req, res, next) => {
    try {
        const password = req.body.password;
        const encryptedPassword = bcrypt.hashSync(password, salt);

        const email = req.body.email; // Extract email from req.body

        // Check if user already exists
        const checkUser = 'SELECT * FROM registration WHERE email=?';
        connection.query(checkUser, [email], function (err, rows) {
            if (err) {
                return res.status(401).json({ message: 'Error in getting email' });
            } else {
                if (rows.length) {
                    return res.status(400).json({ message: 'Email already exists' });
                } else {
                    const sql = 'INSERT INTO registration (name, email, password) VALUES (?, ?, ?)';
                    const values = [req.body.name, email, encryptedPassword];

                    connection.query(sql, values, (err, data) => {
                        if (err) {
                            console.error('Database Error:', err);
                            return res.status(500).json({ error: 'Error inserting data into the database' });
                        }
                        return res.status(200).json({ success: true, data: data });
                    });
                }
            }
        });
    } catch (error) {
        console.error('Hashing Error:', error);
        return res.status(500).json({ error: 'Error hashing the password' });
    }
});

module.exports = router;
