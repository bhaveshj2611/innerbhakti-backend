const mongoose = require("mongoose");
const connectDB = async () => {
  const connectionString = process.env.DB_URL;
  try {
    await mongoose.connect(connectionString, {
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
