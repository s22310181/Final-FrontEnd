import {
  getUsers,
  getUserById,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser
} from '../utils/dbHelper.js';

/**
 * GET /api/users
 * Get all users
 */
export const getAllUsers = (req, res) => {
  try {
    const users = getUsers();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

/**
 * GET /api/users/:id
 * Get user by ID
 */
export const getUser = (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

/**
 * POST /api/users
 * Create new user
 */
export const createUser = (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }
    
    // Check if email already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }
    
    const newUser = addUser({
      name,
      email,
      password, // In production, hash this password
      role: role || 'user',
      createdAt: new Date().toISOString()
    });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
};

/**
 * PUT /api/users/:id
 * Update user
 */
export const updateUserController = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Check if user exists
    const existingUser = getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // If email is being updated, check if it's already taken
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = getUserByEmail(updateData.email);
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }
    }
    
    const updatedUser = updateUser(id, updateData);
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

/**
 * DELETE /api/users/:id
 * Delete user
 */
export const deleteUserController = (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const existingUser = getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const deleted = deleteUser(id);
    
    if (deleted) {
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete user'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

