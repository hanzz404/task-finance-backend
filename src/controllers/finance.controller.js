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

module.exports = {
  getFinance,
  createFinance,
};
