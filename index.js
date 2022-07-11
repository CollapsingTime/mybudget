const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/auth", require("./routes/jwtAuth"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
