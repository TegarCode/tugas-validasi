const { SECRET_KEY, USERS } = require("../items");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    try {
      const verify = jwt.verify(token, SECRET_KEY);
      const user = USERS.filter((item) => item.id === verify.id)[0];

      delete user.password;
      req.user = user;
    } catch (err) {
      return res.status(401).json({ message: "token is invalid" });
    }
  } else {
    return res.status(401).json({ message: "token not found" });
  }

  next();
};

module.exports = { protect };
