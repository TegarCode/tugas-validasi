const {body} = require("express-validator");


const loginValidator = [
    body("email")
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Email tidak valid"),
    body("password")
    .notEmpty().withMessage("Password wajib diisi")
    .isLength( { min: 8} ).withMessage("Password minimal 8 karakter ")
    .matches(/^(?=.*[!@#$%^&*])/).withMessage("Password harus memiliki minimal 1 simbol"),

];

module.exports = loginValidator;