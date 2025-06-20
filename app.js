const express = require("express");
const mongoose=require("mongoose");
 const app= express();
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
 const productSchema=new mongoose.Schema({
    name:String,
    discription:String,
    price:Number,
 })
 const Product =new mongoose.model("Product",productSchema)

 app.post("/api/v1/product/new",(req,res)=>{
  const product=  Product.create(req.body);
  res.status(200).json({
    success:true,
    product
  })
 })

 app.listen(4500,()=>{
    console.log("Server is running on http://localhost:4500");
 })
