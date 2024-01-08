
const express = require('express');
const connection=require('./connection.js')
const app =express();
const productRoute = require ('./routes/product.js')
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//routes

app.use('/products',productRoute);
module.exports = app;