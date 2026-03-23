import express from "express";
import Product from "../models/Products.js";
import { protect, adminOnly, userOnly } from "../middleware/authMiddleware.js";

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

router.post("/:id/purchase", protect, userOnly, (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return Purchase.findOne({
        user: req.user._id,
        product: req.params.id,
      }).then((existingPurchase) => {
        if (existingPurchase) {
          return res
            .status(400)
            .json({ message: "You have already purchased this product" });
        }

        return Purchase.create({
          user: req.use._id,
          product: req.params._id,
        });
      });
    })
    .then((purchase) => {
      if (!purchase || purchase.headersSent) {
        return;
      }

      return res.status(201).json({
        message: "Purchase successful",
        purchase,
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.get("/:id/purhcasers", protect, adminOnly, (req, res) => {
  Purchase.find({ product: req.params.id })
    .populate("user", "username")
    .then((purchases) => {
      res.json(purchases);
    });
});

export default router;
