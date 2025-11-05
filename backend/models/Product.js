const mongoose=require('mongoose');

//defination of product schema

const productSchema=new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
})

const Product=mongoose.model("Product",productSchema);

module.exports = Product;