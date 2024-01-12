
const express = require('express');
const connection=require('./connection.js')
const cors = require('cors')
const app =express();
const bodyParser = require('body-parser')
const productRoute = require ('./routes/product.js')
const Registerroute = require ('./routes/registration.js')
const Loginroute = require('./routes/login.js')
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//routes
app.use('/products',productRoute);
app.use('/register',Registerroute);
app.use('/user',Loginroute);
module.exports = app;