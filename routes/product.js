const express = require('express');
const connection = require('../connection.js')


const router = express.Router();
//create
router.post('/create',(req,res,next)=>{
    let product = req.body;
    query = 'insert into product(name,description,price) value(?,?,?) ';
    connection.query(query,[product.name,product.description,product.price],(err,results)=>{
        if(!err){
            return res.status(200).json({message:'product added successfully'})
        }
        else
         return res.status(500).json(err);
    });
    //show

    router.get('/read',(req,res,next)=>{
      var  query ='select *from product';
      connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }else

        return res.status(500).json(err);
      });
 
    })


})

module.exports=router;