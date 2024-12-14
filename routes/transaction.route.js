const express = require("express");
const router = express.Router();
const authValidate = require("../middleware/auth");
const {
  createTransaction,
  getAllTransactions,
  getExpenses,
  getIncomes,
  getTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

//Creates new transaction
router.post("/new", authValidate, createTransaction);

//Gets all transactions
router.get("/all", authValidate, getAllTransactions);

//Get only Expenses
router.get("/expenses", authValidate, getExpenses);

//Gets only incomes
router.get("/incomes", authValidate, getIncomes);

//Gets a single transaction
router.get("/:transactionId", authValidate, getTransaction);

//Edits a transaction
router.patch("/:transactionId", authValidate, editTransaction);

//Deletes a transaction
router.delete("/:transactionId", authValidate, deleteTransaction);

module.exports = router;
