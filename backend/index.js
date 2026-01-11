// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // ✅ Important to parse JSON bodies

// // Routes
// app.use("/auth", require("./routes/auth"));
// app.use("/courses", require("./routes/courses"));
// app.use("/subscribe", require("./routes/subscribe"));

// // MongoDB connection
// mongoose.connect("mongodb://127.0.0.1:27017/mini-course-app", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error(err));

// app.listen(5000, () => console.log("Server running on port 5000"));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const subscribeRoutes = require("./routes/subscribe");

app.use("/courses", courseRoutes);
app.use("/auth", authRoutes);
app.use("/subscribe", subscribeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
