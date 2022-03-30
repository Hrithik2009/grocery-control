const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./db/connect');
const cookieParser = require('cookie-parser');
const {auths, checkUser} = require('./middleware/auth');
require('dotenv').config()

app.use(express.static('./public'));
app.use(express.json());

app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(authRoutes);
app.use(productRoutes);

app.get('/', auths, checkUser, (req, res) => res.render('dashbord'));
app.get('/inventory', auths, (req, res) => res.render('inventory'));
app.get('/sales', auths, (req, res) => res.render('sales'));
app.get('/products', auths, (req, res) => res.render('products'));

const port = 5000;
const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is at port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()