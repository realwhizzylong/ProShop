import express from 'express';
import { getProducts, getProductById, deleteProductById, updateProductById, createProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/', protect, admin, createProduct);

router.get('/:id', getProductById);

router.delete('/:id', protect, admin, deleteProductById);

router.put('/:id', protect, admin, updateProductById);

export default router;