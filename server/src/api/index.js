const express = require("express");
const mongoose = require("mongoose");
const Product = require("../db/productSchema");

const router = express.Router();

router.get("/all", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get("/autocomplete", async (req, res) => {
  const searchTerm = req.query.search;
  const regex = new RegExp(searchTerm, "i");
  const products = await Product.find(
    { title: { $regex: regex } },
    { title: 1 }
  ).limit(10);
  res.json(products);
});

router.get("/search", async (req, res, next) => {
  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const searchTerm = req.query.search;
    const regex = new RegExp(searchTerm, "i");
    const resultsCount = await Product.countDocuments({
      title: { $regex: regex },
    });
    const totalPages = Math.ceil(resultsCount / limit);
    if (page > totalPages) {
      res.status(400);
      throw new Error(`Page number out of range totalPages`);
    }
    const products = await Product.find({ title: { $regex: regex } })
      .skip(skip)
      .limit(limit);
    res.json({ products, page, limit, resultsCount, totalPages });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
