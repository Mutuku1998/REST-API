const express = require('express');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const connection = require('../connection.js');

const router = express.Router()

router.post('/resetpassword',(req,res)=>{

  
    //check if email exists
    const email = req.body.email;
    const sql = 'SELECT * FROM registration WHERE email=?';
    const values = [email];

    connection.query(sql,values, (err,results)=>{
        if(err){
            console.error(err);
            return res.status(500).json({message:'internal server error'})
        }
        if(results.length == 0){
            return res.status(404).json({message:'email not found'})
        }

        const password = req.body.password;
        const encryptedPassword = bcrypt.hashSync(password, salt);

        const reset = 'UPDATE registration SET password = ? WHERE email=?'

        connection.query(reset,encryptedPassword,email,(updateErr,updateResults)=>{
            if(updateErr){
                console.error(updateErr);
                return res.status(500).json({message:'internal server error'})
                
            }else{
                res.status(200).json({message:'password reset was successful'})
            }

        })
        
    })
})