import express from 'express';
import { createOrder, getOrders, getOrderById, getMyOrders, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getOrders);

router.post('/', protect, createOrder);

router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);

router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default router;