// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token"); // check if user is logged in

//   if (!token) {
//     // if not logged in, redirect to login page
//     return <Navigate to="/login" replace />;
//   }

//   return children; // render the page if logged in
// };

// export default ProtectedRoute;


// src/components/ProtectedRoute.js
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import API from "../api";

// const ProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const checkAdmin = async () => {
//       try {
//         const res = await API.get("/auth/me"); // returns user info
//         setIsAdmin(res.data.isAdmin === true);
//       } catch {
//         setIsAdmin(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAdmin();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>; // optional loading state
//   }

//   if (!isAdmin) {
//     // If not admin, redirect to home (Courses page)
//     return <Navigate to="/" replace />;
//   }

//   // If admin, render the child component (AddCourse)
//   return children;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/login" />;
  }

  // Admin-only check for AddCourse page
  if (window.location.pathname === "/add-course" && !isAdmin) {
    toast.error("Only admins can add courses");
    return <Navigate to="/courses" />;
  }

  return children;
};

export default ProtectedRoute;
