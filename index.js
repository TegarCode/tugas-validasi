const express = require("express");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");

const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);

const port = 5000;



app.listen(port, () => {
  console.log(`run on http://localhost:${port}`);
});
