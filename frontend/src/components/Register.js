
// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("Email and password are required");
//       return;
//     }

//     try {
//       await API.post("/auth/register", { name, email, password });
//       alert("Registered successfully! Please login.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#f5f7fa",
//       }}
//     >
//       <form
//         onSubmit={handleRegister}
//         style={{
//           width: "350px",
//           padding: "30px",
//           backgroundColor: "#ffffff",
//           borderRadius: "10px",
//           boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//           Create Account
//         </h2>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Your name"
//             style={inputStyle}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//             style={inputStyle}
//             required
//           />
//         </div>

//         <div style={{ marginBottom: "20px" }}>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="********"
//             style={inputStyle}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#4f46e5",
//             color: "#fff",
//             border: "none",
//             borderRadius: "6px",
//             fontSize: "16px",
//             cursor: "pointer",
//           }}
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginTop: "5px",
//   borderRadius: "6px",
//   border: "1px solid #ccc",
//   fontSize: "14px",
// };

// export default Register;


import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      // alert("Registered successfully! Please login.");
      toast.success("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      // alert(err.response?.data?.message || "Registration failed");
      toast.error(err.response?.data?.message || "Registration failed"); // ✅ toa
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleRegister} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <button style={buttonStyle}>Register</button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#2196f3", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f5f7fa",
};

const formStyle = {
  width: "350px",
  padding: "30px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

export default Register;
