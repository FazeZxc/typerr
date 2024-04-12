const express = require("express");
const { dbConnect } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/User");
const putData = require("./routes/UploadData");

app.use("/api/v1", userRoutes);
app.use("/api/v1/auth", putData);

app.listen(5000, () => {
  console.log(`App is running at port no - ${PORT}`);
});

dbConnect();
