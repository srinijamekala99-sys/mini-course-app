const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // make sure path is correct
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI; // your existing backend .env

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("Admin123", 10);

    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    if (adminExists) {
      console.log("Admin already exists");
      return process.exit();
    }

    const admin = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      isAdmin: true
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();

