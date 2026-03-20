import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorisation denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    User.findById(decoded.id)
      .select("-password")
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        return res.status(500).json({ message: "Server Error", error: err });
      });
  });
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Unauthorised access to non-admins" });
};
