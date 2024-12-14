const Transaction = require("../models/Transaction.model");

const createTransaction = async (req, res) => {
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
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error. Please try later." });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Transaction.find({
      userId: req.user._id,
      type: "expense",
    }).sort({ createdAt: -1 });
    return res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Transaction.find({
      userId: req.user._id,
      type: "income",
    }).sort({ createdAt: -1 });
    return res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

const getTransaction = async (req, res) => {
  try {
    const id = req.params.transactionId;
    const transaction = await Transaction.findOne({
      _id: id,
      userId: req.user._id,
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error. Please try later." });
  }
};

const editTransaction = async (req, res) => {
  try {
    const id = req.params.transactionId;
    let modification = req.body;
    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        _id: id,
        userId: req.user._id,
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
};

const deleteTransaction = async (req, res) => {
  try {
    const id = req.params.transactionId;
    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: id,
      userId: req.user._id,
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
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getExpenses,
  getIncomes,
  getTransaction,
  editTransaction,
  deleteTransaction,
};
