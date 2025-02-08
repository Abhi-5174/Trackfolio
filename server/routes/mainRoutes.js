const express = require("express");

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  authVerify,
  contactUs,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res, next) =>
  res.status(200).send("Welcome to the homepage")
);

router.post("/signup", signup);
router.post("/login", login);
router.post("/auth-verify", authVerify);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/contact", contactUs);

module.exports = router;
