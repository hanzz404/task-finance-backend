const express = require('express');
const { getFinance, createFinance } = require('../controllers/finance.controller');

const router = express.Router();

router.get('/', getFinance);
router.post('/', createFinance);

module.exports = router;
