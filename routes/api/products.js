//to create router
const express = require("express");
let router = express.Router();
var {Product,validate} = require("../../models/products");
const auth = require("../../middleware/auth");
const admin=require("../../middleware/admin");
//get products we are getting array we want to return a database so open new terminal
//for products
router.get("/",auth,async(req,res)=> {
  console.log(req.user);
    let page = Number(req.query.page? req.query.page:1);
    let perPage = Number(req.query.perPage? req.query.perPage:10);
    let skipRecords = perPage * (page-1);
    let products = await Product.find().skip(skipRecords).limit(perPage);
     return res.send(products);



});
// for single product
router.get("/:id",async(req,res)=> {
    try
    {
    let product =await Product.findById(req.params.id);
     if(!product)
     
        return res.status(400).send("product with given id not present");//when id not present
        return res.send(product);
    }
    catch{
        return res.status(400).send("Invalid Id");//when format not correct
    }


});
//to update
router.put("/:id",auth,admin,async(req,res)=> {
    let { error} = new validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    
    let product =await Product.findById(req.params.id);
    product.BrandName= req.body.BrandName;
    product.Description=req.body.Description;
    await product.save();

    return res.send(product);



});

//to delete
router.delete("/:id",auth,admin,async(req,res)=> {
    let product =await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});
//to post
//validate
router.post("/",auth,async(req,res)=> {

    let { error} = new validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    
    
    let product = new Product();
    product.BrandName= req.body.BrandName;
    product.Description=req.body.Description;
    await product.save();
    return res.send(product);
});

module.exports= router;

//auth means first login
//admin who can