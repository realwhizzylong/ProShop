import dotenv from 'dotenv';
import products from './data/products.js';
import users from './data/users.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Review from './models/reviewModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0];
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser._id }
        });

        await Product.insertMany(sampleProducts);

        console.log('Data imported.');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();

        console.log('Data destroyed.');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}