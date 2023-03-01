const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app");

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URI || "127.0.0.1")
  .then(console.log("[Booting]: Connected to DB Sucessfully!"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3120;

app.listen(PORT, () =>
  console.log("[Booting]: Server process has been initiated")
);
