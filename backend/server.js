// const express = required('express')
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"
import productRoutes from "./router/product_router.js";
dotenv.config();
const app = express();

// app.use(express.json()); //allow to accept or parse the json data in req.body
// middleware
app.use(express.json());
app.use("/api/products", productRoutes); //to use the product router);
//post Man Desktop application
console.log(process.env.MONGO_URI);
app.listen(5000, ()=>{
    connectDB();
    console.log('Heloo Server is running on port http://localhost:5000');
});

// xks8Md6a8mfp9HXu