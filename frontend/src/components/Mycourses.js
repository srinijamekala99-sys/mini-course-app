


// import React, { useEffect, useState } from "react";
// import API from "../api";

// function MyCourses() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     fetchMyCourses();
//   }, []);

//   const fetchMyCourses = async () => {
//     try {
//       const res = await API.get("/subscribe/my");
//       setCourses(res.data);
//     } catch {
//       alert("Failed to load My Courses");
//     }
//   };

//   return (
//     <div>
//       <h2>My Courses</h2>

//       {courses.length === 0 && <p>You have not subscribed to any course</p>}

//       {courses
//         .filter(c => c.courseId)   // ⭐ IMPORTANT LINE (FIX)
//         .map((c, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid gray",
//               padding: "10px",
//               margin: "10px",
//             }}
//           >
//             <h3>{c.courseId.title}</h3>
//             <p>{c.courseId.description}</p>
//             <p>Price Paid: ₹{c.pricePaid}</p>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default MyCourses;


// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import API from "../api";

// function CourseDetail() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [promoCode, setPromoCode] = useState("");
//   const [promoValid, setPromoValid] = useState(false);

//   // Fetch course
//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await API.get(`/courses/${id}`);
//         setCourse(res.data);
//       } catch (err) {
//         alert("Failed to load course");
//       }
//     };
//     fetchCourse();
//   }, [id]);

//   // Apply promo
//   const applyPromo = () => {
//     if (promoCode === "BFSALE25") {
//       setPromoValid(true);
//       alert("Promo applied! 50% off");
//     } else {
//       setPromoValid(false);
//       alert("Invalid promo code");
//     }
//   };

//   // Subscribe
//   const subscribe = async () => {
//     if (!course) return;

//     // Free course
//     if (course.price === 0) {
//       try {
//         const res = await API.post(`/subscribe/${id}`, { promoCode: null });
//         alert(`Subscribed! Price paid: ₹${res.data.pricePaid}`);
//       } catch (err) {
//         alert(err.response?.data?.message || "Subscription failed");
//       }
//       return;
//     }

//     // Paid course without promo
//     if (course.price > 0 && !promoValid) {
//       alert("Please apply a valid promo code first");
//       return;
//     }

//     try {
//       const res = await API.post(`/subscribe/${id}`, { promoCode });
//       alert(`Subscribed! Price paid: ₹${res.data.pricePaid}`);
//     } catch (err) {
//       alert(err.response?.data?.message || "Subscription failed");
//     }
//   };

//   if (!course) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "30px", background: "#f5f7fa", minHeight: "100vh" }}>
//       <div
//         style={{
//           background: "#fff",
//           padding: "25px",
//           borderRadius: "8px",
//           boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
//           maxWidth: "600px",
//           margin: "auto",
//         }}
//       >
//         <h2 style={{ marginBottom: "10px" }}>{course.title}</h2>
//         <p style={{ color: "#555" }}>{course.description}</p>

//         <p style={{ marginTop: "10px" }}>
//           <b>Price:</b> ₹{course.price}
//         </p>

//         {course.price > 0 && (
//           <div style={{ marginTop: "15px" }}>
//             <input
//               type="text"
//               placeholder="Enter promo code"
//               value={promoCode}
//               onChange={(e) => setPromoCode(e.target.value)}
//               style={{
//                 padding: "8px",
//                 width: "60%",
//                 borderRadius: "4px",
//                 border: "1px solid #ccc",
//               }}
//             />
//             <button
//               onClick={applyPromo}
//               style={{
//                 marginLeft: "10px",
//                 padding: "8px 12px",
//                 border: "none",
//                 borderRadius: "4px",
//                 background: "#16a34a",
//                 color: "#fff",
//                 cursor: "pointer",
//               }}
//             >
//               Apply Promo
//             </button>
//           </div>
//         )}

//         <button
//           onClick={subscribe}
//           style={{
//             marginTop: "20px",
//             padding: "10px 15px",
//             background: "#2563eb",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//             width: "100%",
//           }}
//         >
//           Subscribe
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CourseDetail;



// import React, { useEffect, useState } from "react";
// import API from "../api";

// function MyCourses() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     API.get("/subscribe/my")
//       .then(res => setCourses(res.data))
//       .catch(() => setCourses([]));
//   }, []);

//   return (
//     <div style={{ padding: "30px", minHeight: "100vh", background: "#f5f7fa" }}>
//       <h2>My Courses</h2>
//       {courses.length === 0 && <p>You have not subscribed to any courses yet.</p>}
//       {courses.map(c => (
//         <div key={c._id} style={{
//           background: "#fff",
//           padding: "20px",
//           borderRadius: "8px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//           marginBottom: "15px"
//         }}>
//           <h3>{c.title}</h3>
//           <p>{c.description}</p>
//           <p>Price Paid: ₹{c.pricePaid ?? 0}</p>
//           <p>Subscribed On: {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyCourses;



import React, { useEffect, useState } from "react";
import API from "../api";

function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/subscribe/my")
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <div style={{ padding: "30px", minHeight: "100vh", background: "#f5f7fa" }}>
      <h2>My Courses</h2>
      {courses.length === 0 && <p>You have not subscribed to any courses yet.</p>}
      {courses.map(c => (
        <div key={c._id} style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "15px"
        }}>
          <h3>{c.courseId?.title}</h3>
          <p>Price Paid: ₹{c.pricePaid ?? 0}</p>
        </div>
      ))}
    </div>
  );
}

export default MyCourses;
