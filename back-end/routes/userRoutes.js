import express from 'express';
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);

router.get('/profile', protect, getUserProfile);

router.post('/register', registerUser);

export default router;