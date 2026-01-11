import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState(false);
  const [subscribedAt, setSubscribedAt] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
      } catch {
        toast.error("Failed to load course", { autoClose: 1000 });
      }
    };
    fetchCourse();
  }, [id]);

  const applyPromo = () => {
    if (promoCode === "BFSALE25") {
      setPromoValid(true);
      toast.success("Promo applied! 50% off", { autoClose: 1000 });
    } else {
      setPromoValid(false);
      toast.error("Invalid promo code", { autoClose: 1000 });
    }
  };

  const subscribe = async () => {
    if (!course) return;

    try {
      const res = await API.post(`/subscribe/${id}`, {
       promoCode: promoCode.trim() || null,
      });

      toast.success(`Subscribed! Price Paid: ₹${res.data.pricePaid}`, {
        autoClose: 1000,
      });

      setSubscribedAt(res.data.subscribedAt || new Date());
    } catch (err) {
      if (err.response?.data?.message === "Already subscribed") {
        toast.info("You are already subscribed", { autoClose: 1000 });
      } else {
        toast.error("Subscription failed", { autoClose: 1000 });
      }
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px", background: "#f5f7fa", minHeight: "100vh" }}>
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
        )}

        <h2>{course.title}</h2>
        <p>{course.description}</p>

        <p>
          Price:{" "}
          {promoValid ? (
            <>
              <s>₹{course.price}</s> → ₹{course.price / 2}
            </>
          ) : (
            <>₹{course.price}</>
          )}
        </p>

        {course.price > 0 && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              style={{ padding: "6px", width: "200px" }}
            />
            <button
              onClick={applyPromo}
              style={{ marginLeft: "10px", padding: "6px 12px" }}
            >
              Apply Promo
            </button>
          </div>
        )}

        <button
          onClick={subscribe}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>

        {subscribedAt && (
          <p style={{ marginTop: "10px", fontWeight: "500" }}>
            Subscribed on: {new Date(subscribedAt).toLocaleDateString("en-GB")}
          </p>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
