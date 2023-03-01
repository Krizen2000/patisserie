const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const reviewRouter = require("./routes/reviewRoute");
const userRouter = require("./routes/userRoute");
const addressRouter = require("./routes/addressRoute");
const orderRouter = require("./routes/orderRoute");
const couponRouter = require("./routes/couponRoute");
const newsLetterRouter = require("./routes/newsLetterRoute");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/newsLetter", newsLetterRouter);

module.exports = app;
