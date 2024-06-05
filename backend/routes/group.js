const express = require('express');
const { createGroup, inviteMember, addExpense } = require('../controllers/groupController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createGroup);
router.post('/invite', authenticate, inviteMember);
router.post('/expense', authenticate, addExpense);

module.exports = router;
