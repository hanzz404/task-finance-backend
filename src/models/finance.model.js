const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Finance = mongoose.model('Finance', financeSchema);

module.exports = Finance;
