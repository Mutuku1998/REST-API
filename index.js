
const express = require('express');
const connection=require('./connection.js')
const cors = require('cors')
const app =express();

const productRoute = require ('./routes/product.js')
const Registerroute = require ('./routes/registration.js')
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//routes
app.use(express.json());
app.use(cors());
app.use('/products',productRoute);
app.use('/register',Registerroute);
module.exports = app;