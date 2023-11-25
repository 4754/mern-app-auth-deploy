// import express from 'express';
// import path from 'path'
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';

// import userRoutes from './routes/userRoutes.js'
// import { errorHandler,notFound } from './middlewares/errorMiddleware.js';



const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const { errorHandler,notFound } = require("./middlewares/errorMiddleware");

// to access env variables
dotenv.config()
const port = process.env.PORT || 5000



connectDB();
const app = express();
//for parsing data to server from client
app.use(express.json());
//for form data
app.use(express.urlencoded({extended: true}))
// user routes
app.use(cookieParser())
app.use('/api/users', userRoutes) 

if(process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    
    app.get('*', (req,res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'dist','index.html')))
} else {
    app.get('/',(req,res)=> res.send("server is running"));
}




app.use(notFound);
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))

// - **POST /api/users** - Register a user
// - **POST /api/users/auth** - Authenticate a user and get token
// - **POST /api/users/logout** - Logout use and clear cookie
// - **GET /api/users/profile** - Get User profile
// - **PUT /api/users/profies** - Update profile
