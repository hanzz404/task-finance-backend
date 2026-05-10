const express = require('express');
const { getFinance, createFinance, deleteFinance } = require('../controllers/finance.controller');

const router = express.Router();

router.get('/', getFinance);
router.post('/', createFinance);
router.delete('/:id', deleteFinance);

module.exports = router;
