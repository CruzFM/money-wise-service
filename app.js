
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const transactionRoute = require('./routes/transaction.route');
const swaggerSetup = require('./swagger');
const app = express();
const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL

//Allows cross site scripting
app.use(cors());

//Middleware
app.use(express.json());

//Swagger docs
swaggerSetup(app);

//Use Routes
app.use('/auth', authRoute);
app.use('/transactions', transactionRoute);
app.use( (req, res, next) =>{
    res.status(404).send('Not Found');
});

mongoose.connect(databaseUrl)
    .then(()=>{
        console.log("Connection to the DB successful!");
        app.listen(port, ()=>{
            console.log(`Listening to the port ${port}`);
        });
    })
    .catch(()=>{
        console.log("Connection failed!");
    })