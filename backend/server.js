const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app");

dotenv.config();
const PORT = process.env.PORT || 3120;

// mongoose
//   .connect(process.env.MONGO_DB_URI || "127.0.0.1")
//   .then(console.log("[Booting]: Connected to DB Sucessfully!"))
//   .catch((err) => console.log(err));

// app.listen(PORT, () =>
//   console.log("[Booting]: Server process has been initiated")
// );

// * For Serverless hosting
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
