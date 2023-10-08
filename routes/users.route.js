const express = require("express");
const { USERS } = require("../items");
const { param, validationResult } = require("express-validator");
const router = express.Router();
const { protect } = require("../middleware/middleware");

const userIdValidator = [
  param("userId")
    .isNumeric().withMessage("userId harus angka")
];


router.get("/", protect,(req, res) => {
  return res.json({
    data: USERS.map((item) => {
      // delete item.password;
      return item;
    }),
  });
});


router.get("/:userId", protect,
  userIdValidator, 
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation Error",
        detail: errors.array(),
      });
    }

    const userId = req.params.userId;
    const user = USERS.find((item) => item.id === +userId);

    if (!user) {
      return res.status(404).json({
        message: "User dengan userId tidak ditemukan",
      });
    }

    // Jika user ditemukan, kembalikan data user
    const userData = {
      fullName: user.fullName,
      email: user.email,
      bio: user.bio,
      dob: user.dob,
    };

    return res.status(200).json({
      message: "Success",
      data: userData,
    });
  }
);

module.exports = router;