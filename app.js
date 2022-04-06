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

app.use('*', auths);
// app.use('*', checkUser);
app.get('/', (req, res) => {
    res.send("Landing Page Here");
});
app.use('/employee',require('./routes/employeeRoutes'));
app.use('/owner',require('./routes/ownerRoutes'));
app.use('/admin',require('./routes/adminRoutes'));
// app.get('/', (req, res) => res.render('dashbord'));
// app.get('/inventory', (req, res) => res.render('inventory'));
// app.get('/sales', (req, res) => res.render('sales'));


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