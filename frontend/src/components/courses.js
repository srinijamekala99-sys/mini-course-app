
import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchMyCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses", { autoClose: 1000 });
    }
  };

  const fetchMyCourses = async () => {
    try {
      const res = await API.get("/subscribe/my");
      setMyCourses(res.data);
    } catch {
      setMyCourses([]);
    }
  };

  const isSubscribed = (id) =>
    myCourses.some((c) => c.courseId?._id === id);

  const handleSubscribe = (c) => {
    if (isSubscribed(c._id)) {
      toast.info("Already subscribed", { autoClose: 1000 });
      return;
    }

    if (c.price === 0) {
      API.post(`/subscribe/${c._id}`, { promoCode: null })
        .then((res) => {
          toast.success(`Subscribed! Price Paid: ₹${res.data.pricePaid}`, {
            autoClose: 1000,
          });
          fetchMyCourses();
        })
        .catch((err) =>
          toast.error(err.response?.data?.message || "Subscription failed")
        );
    } else {
      toast.info("Open course details to apply promo code", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div style={{ padding: "30px", background: "#f5f7fa", minHeight: "100vh" }}>
      <h2>All Courses</h2>

      {courses.map((c) => (
        <div
          key={c._id}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            marginBottom: "15px",
          }}
        >
          {c.image && (
            <img
              src={c.image}
              alt={c.title}
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          )}

          <h3>
            <Link to={`/course/${c._id}`}>{c.title}</Link>
          </h3>

         
          <p>
            {c.description.length > 120
              ? c.description.slice(0, 120) + "..."
              : c.description}
          </p>

          <p>Price: ₹{c.price}</p>

          <button
            onClick={() => handleSubscribe(c)}
            disabled={isSubscribed(c._id)}
            style={{
              backgroundColor: isSubscribed(c._id) ? "#aaa" : "#007bff",
              color: "#fff",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: isSubscribed(c._id) ? "not-allowed" : "pointer",
            }}
          >
            {isSubscribed(c._id) ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Courses;
