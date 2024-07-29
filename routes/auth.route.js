const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User.model');



//TODO: Implement hashPassword function
async function hashPassword( pw ) {
    try {
        const saltRounds = 8;
        const hash = await bcrypt.hash(pw, saltRounds);
        return hash;
    } catch (error) {
        console.log('There was a problem hashing the password!!!', error);
    }
}


//TODO: Implement route requests for creating user.
router.post('/register', async (req, res) =>{
    try {
        //Todo: this should be a controller function 
        const {username, email, password} = req.body;

        //*Verifies if the user already exists
        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({message: 'User is already registered.'});
        }
        const newUser = new User({
            username,
            email,
            passwordHash: await hashPassword(password)
        });

        console.log("El usuario es: ", newUser);
        
        await newUser.save();
        return res.status(201).json({message: 'User successfully registered.'});
    
    } catch (error) {
        console.error('User could not be registered: ', error);
        return res.status(500).json({message: 'Server internal Error'});
    }
})

//TODO: Implement route requests for log in.


//TODO: Implement route requests for recover password.

module.exports = router;