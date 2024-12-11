import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setResponseMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Check for a successful registration
      if (response.status === 200 || response.data.message === "User registered successfully") {
        setResponseMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Delay navigation for 2 seconds
      } else {
        setResponseMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetMessage = () => {
    setResponseMessage("");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {responseMessage && (
        <div className="error-message">
          <p className="message">{responseMessage}</p>
          {responseMessage !== "Registration successful! Redirecting to login..." && (
            <button onClick={handleResetMessage}>Try Again</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Register;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setResponseMessage("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5001/register", {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//       });

//       // if (response.data.success) {
//       //   setResponseMessage("Registration successful! Please login.");
//       //   navigate("/login");
//       // }

//       if (response.data.success) {
//         setResponseMessage("Registration successful! Please login.");
//         setTimeout(() => navigate("/login"), 2000); // Delay navigation for 2 seconds
//       }


//     } catch (error) {
//       setResponseMessage(error.response?.data?.message || "Registration failed");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleResetMessage = () => {
//     setResponseMessage("");
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       {responseMessage && (
//         <div className="error-message">
//           <p className="message">{responseMessage}</p>
//           <button onClick={handleResetMessage}>Try Again</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Register;



//ok to use (just want to add button to reset))
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       setResponseMessage("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5001/register", {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//       });

//       if (response.data.success) {
//         setResponseMessage("Registration successful! Please login.");
//         setTimeout(() => navigate("/login"), 2000);
//       }
//     } catch (error) {
//       setResponseMessage(error.response?.data?.message || "Registration failed");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//       {responseMessage && <p className="message">{responseMessage}</p>}
//     </div>
//   );
// }

// export default Register;
