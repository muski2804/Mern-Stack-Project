
const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.patch('/:id', updateUser);
router.patch('/:id/password', changePassword);
router.delete('/:id', deleteUser);

module.exports = router;
