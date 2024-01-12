const express = require('express');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10)
const connection = require('../connection.js');

const router = express.Router();

router.post('/login',  (req, res, next) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM registration WHERE email=?';
    const values = [email];

    connection.query(sql, values,  function (error, rows) {
        if (error) {
            return res.status(500).json({ error: 'Error in signing in the user' });
        }


        if(rows.length>0){
            bcrypt.compare(password, rows[0].password, function (error, result) {
                if (error) {
                    console.error('Error in bcrypt compare:', error);
                    return res.status(500).json({ error: 'Error in signing in the user' });
                }
            
                console.log('Result of bcrypt compare:', result);
            
                if (result) {
                    return res.status(200).json({ message: 'Login success' });
                } else {
                    return res.status(401).json({ error: 'Invalid email or  password' });
                }
            });
            
        }
        // if (rows.length > 0) {
        //     const passwordMatch = await bcrypt.compare(password, rows[0].password);

        //     if (passwordMatch) {
        //         return res.status(200).json({ message: 'Login success' });
        //     } else {
        //         return res.status(401).json({ error: 'Invalid password' });
        //     }
        // } else {
        //     return res.status(404).json({ error: 'User not found' });
        // }
    });
});

module.exports = router;
