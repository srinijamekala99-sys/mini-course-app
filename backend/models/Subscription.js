const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Course || mongoose.model("Course", courseSchema);
