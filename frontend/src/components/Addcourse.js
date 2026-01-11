


// import React, { useState } from "react";
// import API from "../api";

// function AddCourse() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");

//   const addCourse = async () => {
//     try {
//       if (!title || !description || !price) {
//         alert("All fields are required");
//         return;
//       }
//       await API.post("/courses", { title, description, price });
//       alert("Course added successfully");
//       setTitle(""); setDescription(""); setPrice("");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add course");
//       console.log(err.response?.data);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Course</h2>
//       <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
//       <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
//       <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
//       <button onClick={addCourse}>Add Course</button>
//     </div>
//   );
// }

// export default AddCourse;


import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses", { title, description, price });
      toast.success("Course added successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add course");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7fa",
      padding: "20px"
    }}>
      <form
        onSubmit={handleAddCourse}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Course</h2>

        <div style={{ marginBottom: "15px" }}>
          <label>Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <button type="submit" style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#2196f3",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
