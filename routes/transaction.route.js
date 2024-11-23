require("dotenv").config();
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction.model");
const authValidate = require("../middleware/auth");

//Creates new transaction
router.post("/new", authValidate, async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      userId: req.user._id,
    });
    await newTransaction.save();
    return res.status(200).json({ message: "Transaction successfully saved!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Transaction not saved." });
  }
});

//Gets all transactions
router.get("/all", authValidate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error. Please try later." });
  }
});

//Get only Expenses
router.get("/expenses", authValidate, async (req, res) => {
  try {
    const expenses = await Transaction.find({ 
      userId: req.user._id,
      type: "expense" 
    });
    return res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

//Gets only incomes
router.get("/incomes", authValidate, async (req, res) => {
  try {
    const incomes = await Transaction.find({ 
      userId: req.user._id,
      type: "income" 
    });
    return res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

//Gets a single transaction
router.get("/:transactionId", authValidate, async (req, res) => {
  try {
    const id = req.params.transactionId;
    const transaction = await Transaction.findOne({ 
      _id: id,
      userId: req.user._id
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error. Please try later." });
  }
});

//Edits a transaction
router.patch("/:transactionId", authValidate, async (req, res) => {
  try {
    const id = req.params.transactionId;
    let modification = req.body;
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { 
        _id: id,
        userId: req.user._id
      },
      modification,
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    return res.status(200).json({ message: "Transaction modified!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
});

//Deletes a transaction
router.delete("/:transactionId", authValidate, async (req, res) => {
  try {
    const id = req.params.transactionId;
    const deletedTransaction = await Transaction.findOneAndDelete({ 
      _id: id,
      userId: req.user._id
    });
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    return res
      .status(200)
      .json({ message: "Transaction successfully deleted!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
