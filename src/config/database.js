const mongoose = require("mongoose");

function DbConfig() {
  const mongoUri = process.env.MONGO_URL;
  mongoose.set("strictQuery", false);

  const config = mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

  return config;
}

module.exports = DbConfig;
