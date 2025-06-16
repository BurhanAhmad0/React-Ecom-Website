const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const ConnectDB = require('./Configs/ConnectDB');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const carRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const uploadRoutes = require('./Routes/uploadImageRoutes')

ConnectDB();

// app.use(express.static('public'));
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Welcome to Exclusive Server'));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', carRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/upload', uploadRoutes);

module.exports = app;
