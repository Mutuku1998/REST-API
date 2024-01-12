const express = require('express');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const connection = require('../connection.js');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM registration WHERE email=?';
    const values = [email];

    connection.query(sql, values, function (error, rows) {
        if (error) {
            console.error('Error in signing in the user:', error);
            return res.status(500).json({ error: 'Error in signing in the user' });
        }

        if (rows.length > 0) {
            const id = rows[0].id;
            const secretKey = 'yOurSecr3tK3yF0rJWT$igning';
            const token = jwt.sign({ id }, secretKey, { expiresIn: 7200 });


            bcrypt.compare(password, rows[0].password, function (error, result) {
                if (error) {
                    console.error('Error in bcrypt compare:', error);
                    return res.status(500).json({ error: 'Error in signing in the user' });
                }

                console.log('Result of bcrypt compare:', result);

                if (result) {
                    return res.status(200).json({ message: 'Login success', token });
                } else {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
            });
        }
    });
});

module.exports = router;
