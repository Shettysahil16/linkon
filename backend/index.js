const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}));
app.use(express.json({limit:"50mb"}));
app.use(cookieParser());

app.use("/api",router);

const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log('MongoDB connected');
        console.log(`server is running on port ${PORT}`);     
    })
}).catch((error) => {
    console.log('MongoDB connection failed');
})
