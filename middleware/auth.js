require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const SECRET_KEY = process.env.SECRET_KEY;

const authValidate = async ( req, res, next ) =>{
    try {
        //Retrieves token from headers.
        let token = req.headers.authorization;
        token = token.replaceAll('Bearer ', '');
        //JWT verifies if token is valid
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ _id: decoded.userId });
        //Sets the user for linking transaction to User creator.
        req.user = user;
        next();
    } catch (error) {
        console.error("This is the error on middleware: ", error);
        return res.status(401).json({message: "Please authenticate."});
    }

}

module.exports = authValidate;