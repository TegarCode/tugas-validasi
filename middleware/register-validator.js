const {body} = require("express-validator");
const { USERS } = require("../items");

const registerValidator = [
    body("fullName")
    .notEmpty().withMessage("FullName wajib diisi"),
    body("email")
    .notEmpty().withMessage("Email wajib diisi")
    .isEmail().withMessage("Email tidak valid")
    .custom((value) => {
        const isEmailUnique = !USERS.some((user) => user.email === value);
        if (!isEmailUnique) {
          throw new Error("Email sudah terdaftar");
        }
        return true;
      }),
    body("password")
    .notEmpty().withMessage("Password wajib diisi")
    .isLength( { min: 8} ).withMessage("Password minimal 8 karakter ")
    .matches(/^(?=.*[!@#$%^&*])/).withMessage("Password harus memiliki minimal 1 simbol"),
    body("bio")
    .optional(),
    body("dob")
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .withMessage('Format tanggal harus yyyy-MM-dd dengan leading zero pada bulan dan tanggal.')
    .notEmpty().withMessage("ttl wajib diisi"),
   
];


module.exports = registerValidator;