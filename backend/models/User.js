
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   isAdmin: { type: Boolean, default: false },
//   subscribedCourses: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
//   ]
// });

// module.exports =
//   mongoose.models.User || mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },

  subscribedCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      pricePaid: Number,
        subscribedAt: {
          type: Date,
          default: Date.now
        
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
