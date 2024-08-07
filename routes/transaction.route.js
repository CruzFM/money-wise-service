require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Transaction = require('../models/Transaction.model');
const authValidate = require('../middleware/auth')

const SECRET_KEY = process.env.SECRET_KEY;

router.get('/', async (req, res)=>{
    const token = req.headers.authorization;
    if (!token){
        return res.status(401).json({message: "Please log in to continue."});
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        //TODO: corroborar usuario es valido
        const userExists = await User.findOne({_id: decoded.userId});
        if (!userExists){ 
            return res.status(403).json({message: "Unauthorized."})
        };
        return res.status(200).json({message: "Ok!"});
    } catch (error) {
        console.error(error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Please log in again.' });
        }
        return res.status(403).json({message: 'Please log in to continue'});
    }
});

//Create new transaction
router.post('/new', authValidate, async (req, res) =>{
    try {
        const newTransaction = new Transaction({
            ...req.body,
            userId: req.user._id
        });
        await newTransaction.save();
        return res.status(200).json({message: "Transaction successfully saved!"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error. Transaction not saved."})
    }
})

//TODO: Get all transactions
router.get("/all", authValidate, async(req, res) =>{
    try {
        const transactions = await Transaction.find({});
        return res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error. Please try later."})
    }
});

//TODO: Get a single transaction
router.get('/:transactionId', authValidate, async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
})

//TODO: Get only Expenses
router.get('/expenses', authValidate, async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
})

//TODO: Get only Incomes
router.get('/incomes', authValidate, async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
})

//TODO: edit transaction
router.patch(':/transactionId', authValidate, async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
})

//TODO: delete transaction
router.delete(':/transactionId', authValidate, async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;