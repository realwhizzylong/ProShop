import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNum) || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize)
    });
})

export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
})

export const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
})

export const updateProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.category = req.body.category || product.category;
        product.brand = req.body.brand || product.brand;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.description = req.body.description || product.description;
        const updatedProduct = await product.save();
        res.json({
            _id: updatedProduct._id,
            name: updatedProduct.name,
            category: updatedProduct.category,
            brand: updatedProduct.brand,
            countInStock: updatedProduct.countInStock
        })
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})

export const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'name',
        price: 0,
        image: '/images/sample.jpg',
        category: 'category',
        brand: 'brand',
        countInStock: 0,
        numReviews: 0,
        description: 'description'
    })
    const createdProduct = await product.save();
    res.status(201);
    res.json(createdProduct);
})

export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const userReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if (userReviewed) {
            res.status(400);
            throw new Error('User has alreadly reviewed this product');
        }
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201);
        res.json({ message: 'Review created' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})