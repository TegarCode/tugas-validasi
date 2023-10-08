const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { USERS, SECRET_KEY } = require("../items");
const erorHandlerMiddleware = require('../middleware/error-handling');

const router = express.Router();

// Import validator middleware
const registerValidator = require('../middleware/register-validator');
const loginValidator = require('../middleware/login-validator');

router.post("/register", registerValidator, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = {
    id: USERS.length + 1,
    ...req.body,
    password: hashPassword,
  };

  USERS.push({ ...newUser });
  delete newUser.password;

  return res.status(200).json({
    status: "success",
    message: "Registrasi berhasil",
    data: newUser,
  });
});

router.post("/login", loginValidator, (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const users = USERS.filter((item) => item.email === email);
  if (!users.length) {
    return res
      .status(401)
      .json({ status: "failed", message: "Invalid email name or password" });
  }

  const user = users[0];
  const savedPassword = user.password;
  const isMatch = bcrypt.compareSync(password, savedPassword);
  if (!isMatch) {
    return res
      .status(401)
      .json({ status: "failed", message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY);
  const data = { ...user };
  delete data.password;
  data.token = token;

  return res.json({
    status: "success",
    email,
    token,
  });
});

// Gunakan middleware errorHandlerMiddleware
router.use(erorHandlerMiddleware);

module.exports = router;
