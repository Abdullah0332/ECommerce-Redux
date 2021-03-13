const express = require('express');
const mongoose = require('mongoose');

const cors= require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const errorMiddleware = require('./middlewares/errors'); 

const authRoute = require('./routes/auth');
const payment = require('./routes/payment');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product');

const app = express();

dotenv.config({ path: 'config/config.env'});

app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
  })   

app.use(cookieParser());
app.use(cors({ origin:true, credentials:true }))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());

//Setting up cloudinary configration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting Down Server due to Uncaught Exception');
    process.exit(1);
});

app.use('/api/v1', authRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', payment);

// Middleware to handle errors
app.use(errorMiddleware);

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB Database Connected')
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT : ${process.env.PORT} .`);
    })
}).catch(error => {
    console.log("MongoDB Connection ERROR :", error)
})
