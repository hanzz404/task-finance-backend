const Finance = require('../models/finance.model');

async function getFinance(req, res, next) {
  try {
    const finances = await Finance.find().sort({ date: -1 });
    res.json(finances);
  } catch (error) {
    next(error);
  }
}

async function createFinance(req, res, next) {
  try {
    const { type, amount, category, date } = req.body;
    const finance = await Finance.create({ type, amount, category, date });
    res.status(201).json(finance);
  } catch (error) {
    next(error);
  }
}

async function deleteFinance(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Finance.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Finance entry not found' });
    }

    res.json({ message: 'Finance deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFinance,
  createFinance,
  deleteFinance,
};
