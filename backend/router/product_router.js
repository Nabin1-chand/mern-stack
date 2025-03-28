import expresss from "express";
import mongoose from "mongoose";
import Product from "../models/product_model.js";

const router = expresss.Router()

// To get all products
router.get("/", async(req, res)=>{
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
router.post("/",async (req, res)=>{
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

router.put("/:id", async(req, res)=>{
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

router.delete("/:id", async (req,res)=>{
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
// console.log(process.env.MONGO_URI);
export default router;