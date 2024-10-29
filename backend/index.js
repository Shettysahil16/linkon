const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}));
// app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use('/api',router);

const PORT = 4020;

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log("connected to database");
        console.log(`server is running on ${PORT}`);      
    })
})


