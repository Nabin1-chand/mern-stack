// const express = required('express')
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js"
import Product from './models/product_model.js';
import mongoose from 'mongoose';
dotenv.config();
const app = express();

// app.use(express.json()); //allow to accept or parse the json data in req.body
app.use(express.json());

// To get all products
app.get("/api/products/", async(req, res)=>{
    try{
       const products = await Product.find({});
    //    res.status(2000).json({sucess:true, data:products});
    res.status(200).json({sucess:true, data:products});
    }catch (error){
           console.log("Error in fetching  products: ", error.message);
           res.status(500).json({sucess:false, message:"Internal Server Error"});
   
       }
   });
// To add a new product
app.post("/api/products",async (req, res)=>{
    // res.send("Server is responding");
    const product = req.body;  //user will send the data in the body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({sucess:false, message:"Please fill all the fields"});
    }
    const newProduct = new Product(product)

    try{
      await   newProduct.save();
        res.status(201).json({sucess:true, data:newProduct});
    }catch(error){
        console.log("Error in create  product: ", error.message);
        res.status(500).json({sucess:false, message:"Internal Server Error"});
    }
});
//To update a product

app.put("/api/products/:id", async(req, res)=>{
    const {id} = req.params;
    const product = req.body;

   if(!mongoose.Types.ObjectId.isValid(id)){
    return  res.status(400).json({sucess:false, message:"Invalid Product ID"});
   }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({sucess:true, data:updatedProduct});
    }catch(error){
        console.log("Error in update product: ", error.message);
        res.status(404).json({sucess:false, message:"Product Not Found"});
        res.status(500).json({sucess:false, message:"Internal Server Error"});
    }
})

app.delete("/api/products/:id", async (req,res)=>{
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess:true, message:"Product Deleted Successfully"});
    }catch(error){
        console.log("Error in delete product: ", error.message);
        res.status(404).json({sucess:false, message:"Product Not Found"});
        res.status(500).json({sucess:false, message:"Internal Server Error"});
    }
    console.log(id);
})
//post Man Desktop application
console.log(process.env.MONGO_URI);
app.listen(5000, ()=>{
    connectDB();
    console.log('Heloo Server is running on port http://localhost:5000');
});

// xks8Md6a8mfp9HXu