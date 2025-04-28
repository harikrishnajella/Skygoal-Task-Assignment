const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', authenticate, allowRoles('admin'), getAllUsers);
router.delete('/:id', authenticate, allowRoles('admin'), deleteUser);

module.exports = router;
