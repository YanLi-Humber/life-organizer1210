import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setAuthState }) {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/login", formData);

      if (response.data.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setAuthState({
          isLoggedIn: true,
          user: response.data.user,
        });

        setResponseMessage("Login successful!");
        navigate("/organizer");
      }
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="identifier"
            placeholder="Email or Username"
            value={formData.identifier}
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
        <button type="submit">Login</button>
      </form>
      {responseMessage && <p className="message">{responseMessage}</p>}
    </div>
  );
}

export default Login;



//ok version, just clear login element after login success
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ setAuthState }) {
//   const [formData, setFormData] = useState({
//     identifier: "",
//     password: "",
//   });
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5001/login", formData);

//       if (response.data.token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         setAuthState({
//           isLoggedIn: true,
//           user: response.data.user,
//         });

//         setResponseMessage("Login successful!");
//         navigate("/home");
//       }
//     } catch (error) {
//       setResponseMessage(error.response?.data?.message || "Login failed");
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
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             name="identifier"
//             placeholder="Email or Username"
//             value={formData.identifier}
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
//         <button type="submit">Login</button>
//       </form>
//       {responseMessage && <p className="message">{responseMessage}</p>}
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ setAuthState }) {
//   const [formData, setFormData] = useState({
//     identifier: "",
//     password: "",
//   });
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // const response = await axios.post("http://localhost:5001/login", formData);
//       const response = await axios.post("http://localhost:5001/login", {
//         identifier: formData.identifier, // Make sure identifier is handled in the backend
//         password: formData.password,
//       });
      

//       if (response.data.token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         setAuthState({
//           isLoggedIn: true,
//           user: response.data.user,
//         });

//         setResponseMessage("Login successful!");
//         navigate("/home");
//       }
//     } catch (error) {
//       setResponseMessage(error.response?.data?.message || "Login failed");
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
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             name="identifier"
//             placeholder="Email or Username"
//             value={formData.identifier}
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
//         <button type="submit">Login</button>
//       </form>
//       {responseMessage && <p className="message">{responseMessage}</p>}
//     </div>
//   );
// }

// export default Login;














// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ setAuthState }) {
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure either username or email is provided
//     if (!emailOrUsername || !password) {
//       setResponseMessage("Please enter both email/username and password.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5001/login", {
//         username: emailOrUsername,
//         email: emailOrUsername,
//         password: password,
//       });
//       console.log("Response:", response.data);

//       if (response.data.token) {
//         // Save token and user info to localStorage
//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         // Update the auth state to reflect the login
//         setAuthState({
//           isLoggedIn: true,
//           user: response.data.user,
//         });

//         // Redirect to the home page after successful login
//         navigate("/home");
//       } else {
//         setResponseMessage("Login failed. Invalid credentials.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error.response?.data || error.message);
//       setResponseMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Email or Username"
//           value={emailOrUsername}
//           onChange={(e) => setEmailOrUsername(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="current-password"
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>{responseMessage}</p>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login({ setAuthState }) {
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure either username or email is provided
//     if (!emailOrUsername || !password) {
//       setResponseMessage("Please enter both email/username and password.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5001/login", {
//         username: emailOrUsername,
//         email: emailOrUsername,
//         password: password,
//       });
//       console.log("Response:", response.data);

//       if (response.data.token) {
//         // Save the token and user info to localStorage
//         localStorage.setItem("authToken", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));

//         // Update auth state and redirect
//         setAuthState({
//           isLoggedIn: true,
//           user: response.data.user,
//         });
//         navigate("/home");
//       } else {
//         setResponseMessage("Login failed. Invalid credentials.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error.response?.data || error.message);
//       setResponseMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Email or Username"
//           value={emailOrUsername}
//           onChange={(e) => setEmailOrUsername(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="current-password"
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>{responseMessage}</p>
//     </div>
//   );
// }

// export default Login;












//can register, without doing the link change setting.
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); 
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure either username or email is provided
//     if (!emailOrUsername || !password) {
//       setResponseMessage("Please enter both email/username and password.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5001/login", { 
//         username: emailOrUsername, 
//         email: emailOrUsername, 
//         password : password,
//       });
//       console.log("Response:", response.data);
//       setResponseMessage(response.data.message);

//       if (response.data.token) {
//         console.log("Token received:", response.data.token); // Log token
//         setIsLoggedIn(true); // Update login state
//         navigate("/home"); // Redirect to Home page
//       }
//     } catch (error) {
//       console.error("Error during login:", error.response?.data || error.message);
//       setResponseMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Email or Username"
//           value={emailOrUsername}
//           onChange={(e) => setEmailOrUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       {/* {responseMessage && <p>{responseMessage}</p>} */}
//       <p>{responseMessage}</p>
//     </div>
//   );
// }

// export default Login;
















// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // For redirecting after login

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");
//   const navigate = useNavigate(); // Hook to redirect on successful login

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted with email:", email, "and password:", password);

//     try {
//       const response = await axios.post("http://localhost:5001/login", { email, password });
//       console.log("Backend response:", response.data); // Log the response from backend
//       setResponseMessage(response.data.message);

//       // Save user data to localStorage or use a state management library
//       localStorage.setItem("user", JSON.stringify(response.data.user));

//       // Redirect to another page, e.g., dashboard or home
//       navigate("/dashboard"); 
//     } catch (error) {
//       console.error("Error logging in:", error.response?.data || error);
//       setResponseMessage(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       {responseMessage && <p>{responseMessage}</p>}
//     </div>
//   );
// }

// export default Login;


