const Group = require('../models/Group');
const User = require('../models/User');
const Expense = require('../models/Expense');
const { sendInvitationEmail } = require('../services/emailService.js');

exports.createGroup = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const group = new Group({ name, members: [userId] });
    await group.save();

    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.inviteMember = async (req, res) => {
  const { email, groupId } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Send invitation email
      await sendInvitationEmail(email, groupId);
      return res.status(200).json({ message: 'Invitation email sent' });
    }

    group.members.push(user._id);
    await group.save();

    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addExpense = async (req, res) => {
  const { description, amount, paidBy, sharedWith, groupId } = req.body;

  try {
    const expense = new Expense({ description, amount, paidBy, sharedWith, group: groupId });
    await expense.save();

    const group = await Group.findById(groupId);
    group.expenses.push(expense._id);
    await group.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
