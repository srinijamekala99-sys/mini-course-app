







const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// SUBSCRIBE
router.post("/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(req.user.id);

    // already subscribed
    if (user.subscribedCourses.some(c => c.courseId?.toString() === course._id.toString())) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    let pricePaid = 0;

    // PAID COURSE
    if (course.price > 0) {
      if (req.body.promoCode !== "BFSALE25") {
        return res.status(400).json({ message: "Invalid promo code" });
      }
      pricePaid = 299; // FIXED HALF PRICE
    }

    user.subscribedCourses.push({
      courseId: course._id,
      pricePaid,
      subscribeAt: new Date(),
    });

    await user.save();

    res.json({ pricePaid, subscibedAt: subscription.subscribeAt,});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Subscription failed" });
  }
});

// MY COURSES
router.get("/my", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("subscribedCourses.courseId");
  res.json(user.subscribedCourses);
});

module.exports = router;
