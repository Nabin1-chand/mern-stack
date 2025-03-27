// const express = required('express')
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"
dotenv.config();
const app = express();
app.get("/products", (req, res)=>{
    // res.send("Server is responding");
});
console.log(process.env.MONGO_URI);
app.listen(5000, ()=>{
    connectDB();
    console.log('Heloo Server is running on port http://localhost:5000');
});

// xks8Md6a8mfp9HXu