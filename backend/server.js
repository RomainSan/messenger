const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/user", require("./routes/user.routes"));
app.use("/chat", require("./routes/chat.routes"));

//Database connexion
connectDB();

//Launch server
app.listen(port, () => console.log("listen on port : " + port));
