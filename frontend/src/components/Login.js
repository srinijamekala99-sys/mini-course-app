
// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { email, password });

//       // Save token and admin status
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("isAdmin", res.data.isAdmin ? "true" : "false"); // store true or false

//       alert("Login successful!");
//       navigate("/"); // redirect to courses page
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#f5f7fa",
//         padding: "20px"
//       }}
//     >
//       <form
//         onSubmit={handleLogin}
//         style={{
//           background: "#fff",
//           padding: "30px",
//           borderRadius: "10px",
//           boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
//           width: "100%",
//           maxWidth: "400px"
//         }}
//       >
//         <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginTop: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc"
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: "20px" }}>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginTop: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc"
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "12px",
//             border: "none",
//             borderRadius: "5px",
//             backgroundColor: "#4caf50",
//             color: "#fff",
//             fontWeight: "bold",
//             cursor: "pointer"
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
// import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.isAdmin ? "true" : "false");

      toast.success("Login successful!");
      navigate("/courses");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

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

        <button style={buttonStyle}>Login</button>
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
  background: "#4caf50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

export default Login;
