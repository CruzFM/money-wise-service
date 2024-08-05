const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const TransactionSchema = Schema(
  {
    //The user that made the transaction
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: String,
    description: String,
    //When this transaction was made.
    date: {
        type: Date,
        default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = model('Transaction', TransactionSchema);

module.exports = Transaction;