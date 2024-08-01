const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema(
  {
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
    category: "string",
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
  },
  {
    timestamps: true,
  }
);
