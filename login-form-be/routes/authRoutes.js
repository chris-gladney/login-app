import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

router.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Please provide username, password and role" });
  }

  if (!["user", "admin"].includes(role)) {
    return res
      .status(400)
      .json({ message: "Must be registering an admin or user" });
  }

  User.findOne({ username }).then((existingUser) => {
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    return bycrpt.genSalt(10);
  }).then((salt) => {
    return bcrypt.hash(password, salt)
  }).then((hashedPwassword) => {
    return User.create({
        username, password: hashedPwassword, role
    })
  }).then((user) => {
      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
        token: generateToken(user._id, user.role),
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
          message: "Login successful",
          user: {
            id: user._id,
            username: user.username,
            role: user.role,
          },
          token: generateToken(user._id, user.role),
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
});

router.get("/purchase", protect, (req, res) => {
  return res.status(200).json({
    message: `Welcome ${req.user.username}, you can purchase products here.`,
  });
});

router.post("/products", protect, adminOnly, (req, res) => {
  return res.status(200).json({
    message: `Welcome ${req.user.username}, you can add products here.`,
  });
});

export default router;
