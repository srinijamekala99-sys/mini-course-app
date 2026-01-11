// // backend/routes/courses.js
// const express = require("express");
// const router = express.Router();
// const Course = require("../models/course");
// const authMiddleware = require("../middleware/authMiddleware");
// const User = require("../models/User");

// // Create course
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user.isAdmin) return res.status(403).json({ message: "Not authorized" });

//     const course = new Course(req.body);
//     await course.save();
//     res.status(201).json(course);
//   } catch (err) {
//     res.status(500).json({ message: "Course creation failed" });
//   }
// });

// // Get all courses
// router.get("/", async (req, res) => {
//   const courses = await Course.find();
//   res.json(courses);
// });

// // Delete course (admin only)
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user.isAdmin) return res.status(403).json({ message: "Not authorized" });

//     await Course.findByIdAndDelete(req.params.id);
//     res.json({ message: "Course deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE course (admin)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch {
    res.status(500).json({ message: "Course creation failed" });
  }
});

// GET all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// 🆕 GET single course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch {
    res.status(500).json({ message: "Error fetching course" });
  }
});

// DELETE course (admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
