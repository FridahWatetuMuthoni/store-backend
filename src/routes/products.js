import { Router } from "express";
import Product from "../models/Products.js";
import mongoose from "mongoose";

const product_router = Router();

product_router.get("/api/products", async (request, response) => {
  try {
    const products = await Product.find({});
    return response.status(200).send(products);
  } catch (err) {
    console.error(`Error:${err.message}`);
    return response
      .status(404)
      .json({ success: false, message: "No products were found" });
  }
});

product_router.post("/api/products", async (request, response) => {
  const {
    body: { name, price, image },
  } = request;

  if (!name || !price || !image) {
    console.log("one is false");
    return response
      .status(400)
      .json({ success: false, message: "please provide all the fields" });
  }

  const new_product = new Product({ name, price, image });

  try {
    const saved_product = await new_product.save();
    return response.status(201).send(saved_product);
  } catch (err) {
    console.error(`Error while creating product: ${err.message}`);
    return response
      .status(500)
      .json({ success: false, message: "Server Error" });
  }
});

product_router.delete("/api/products/:id", async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    return response
      .send(200)
      .json({ sucess: true, message: "product deleted" });
  } catch (err) {
    console.error(`Error:${err.message}`);
    return response
      .status(500)
      .json({ success: false, message: "Server Error" });
  }
});

product_router.put("/api/products/:id", async (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    return response.status(200).json(product);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return response
      .status(500)
      .json({ success: false, message: "Server Error" });
  }
});

export default product_router;
