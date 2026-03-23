import express from "express";
import Product from "../models/Products.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price required" });
  }

  Product.create({ name, price, description })
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/", protect, (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id/purchasers", protect, adminOnly, (req, res) => {
  Product.findById(req.params.id)
    .populate("purchaseres.user", "username")
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product.purchasers);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

export default router;
