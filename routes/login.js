const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../connection.js');

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const sql = 'SELECT * FROM registration WHERE LOWER(email) = LOWER(?)';
        connection.query(sql, [email], async (err, results) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: 'Error querying database' });
            }

            if (results.length === 0) {
                console.log('Provided email:', email);
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const storedHashedPassword = results[0].password;

            console.log('Provided email:', email);
            console.log('Stored hashed password:', storedHashedPassword);

            const match = await bcrypt.compare(password, storedHashedPassword);

            if (!match) {
                console.log('Password comparison result:', match);
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            return res.status(200).json({ success: true, user: results[0] });
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: 'Error during login' });
    }
});

module.exports = router;
