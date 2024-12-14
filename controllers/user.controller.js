const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("../models/User.model");
const { hashPassword } = require("../utils/auth.utils");
const SECRET_KEY = process.env.SECRET_KEY

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //*Verifies if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User is already registered." });
    }

    //*Creates new User and saves it
    const newUser = new User({
      username,
      email,
      passwordHash: await hashPassword(password),
    });

    await newUser.save();
    return res.status(201).json({ message: "User successfully registered." });
  } catch (error) {
    console.error("User could not be registered: ", error);
    return res.status(500).json({ message: "Server internal Error" });
  }
};

const loginUser = async (req, res) =>{
    try {
        const { email, password } = req.body;

        //*Verifies if user exists.
        const user = await User.findOne({ email });
    
        //*If not, sends an error message.
        if(!user){
            return res.status(401).json({ message: 'Invalid email or password'});
        }
        
        //*Compares given password with encrypted password, using bcrypt.
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        //*Generates a JWT
        const token = jwt.sign({ userId: user._id}, SECRET_KEY, {expiresIn: '1h'});
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
}