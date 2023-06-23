const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
console.log("server started on port:", PORT);
app.listen(PORT);
