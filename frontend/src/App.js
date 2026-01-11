

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useLocation,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";

// import Register from "./components/Register";
// import Login from "./components/Login";
// import Courses from "./components/courses";
// import AddCourse from "./components/AddCourse";
// import ProtectedRoute from "./components/ProtectedRoute";
// import MyCourses from "./components/Mycourses";
// import CourseDetail from "./components/coursedetail";

// function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("isAdmin");
//     navigate("/login");
//   };

//   // ❌ Hide navbar on login & register
//   if (location.pathname === "/login" || location.pathname === "/register") {
//     return null;
//   }

//   return (
//     <nav style={navStyle}>
//       <Link to="/">Courses</Link>
//       <Link to="/add-course">Add Course</Link>
//       <Link to="/my-courses">My Courses</Link>

//       {!token && <Link to="/register">Register</Link>}
//       {!token && <Link to="/login">Login</Link>}
//       {token && (
//         <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// }

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         {/* Redirect to login if no token */}
//         <Route
//           path="/"
//           element={token ? <Courses /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/add-course"
//           element={
//             <ProtectedRoute>
//               <AddCourse />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/course/:id" element={<CourseDetail />} />
//         <Route path="/my-courses" element={token ? <MyCourses /> : <Navigate to="/login" />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// const navStyle = {
//   display: "flex",
//   gap: "15px",
//   padding: "15px 30px",
//   backgroundColor: "#ffffff",
//   borderBottom: "1px solid #ddd",
//   fontWeight: "500",
// };

// export default App;


import React from "react";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/courses";
import AddCourse from "./components/Addcourse";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCourses from "./components/Mycourses";
import CourseDetail from "./components/coursedetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // Hide navbar on login & register
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav style={navStyle}>
      <Link to="/courses">Courses</Link>
      <Link to="/add-course">Add Course</Link>
      <Link to="/my-courses">My Courses</Link>

      {token && (
        <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      )}
    </nav>
  );
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
<ToastContainer
  position="top-right"
  autoClose={1000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
      <Routes>
        {/* Default landing page */}
        <Route
          path="/"
          element={<Navigate to="/register" />}
        />

        {/* Courses protected */}
        <Route
          path="/courses"
          element={token ? <Courses /> : <Navigate to="/login" />}
        />

        <Route
          path="/add-course"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-courses"
          element={token ? <MyCourses /> : <Navigate to="/login" />}
        />

        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

const navStyle = {
  display: "flex",
  gap: "15px",
  padding: "15px 30px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #ddd",
  fontWeight: "500",
};

export default App;
