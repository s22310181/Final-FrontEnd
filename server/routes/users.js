import express from 'express';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUserController,
  deleteUserController
} from '../controllers/userController.js';

const router = express.Router();

// GET /api/users - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUser);

// POST /api/users - Create new user
router.post('/', createUser);

// PUT /api/users/:id - Update user
router.put('/:id', updateUserController);

// DELETE /api/users/:id - Delete user
router.delete('/:id', deleteUserController);

export default router;

