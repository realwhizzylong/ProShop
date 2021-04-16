import express from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUserById, getUserById, updateUserById } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getUsers)

router.post('/login', authUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

router.post('/register', registerUser);

router.get('/:id', protect, admin, getUserById)

router.delete('/:id', protect, admin, deleteUserById);

router.put('/:id', protect, admin, updateUserById);

export default router;