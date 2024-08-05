
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const transactionRoute = require('./routes/transaction.route');
const app = express();
const port = 3000;
const databaseUrl = process.env.DATABASE_URL

//Allows cross site scripting
app.use(cors());

//Middleware
app.use(express.json());

app.use('/auth', authRoute);
app.use('/transactions', transactionRoute)

//Routes
app.get('/', (req, res) => {
    res.send("Hola Ferchu!");
});

mongoose.connect(databaseUrl)
    .then(()=>{
        console.log("Conectado a la base!");
        app.listen(port, ()=>{
            console.log(`Estamos escuchando el puerto ${port}`);
        });
    })
    .catch(()=>{
        console.log("Fallo la conexion!");
    })