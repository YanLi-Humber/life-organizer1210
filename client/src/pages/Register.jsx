//for hashing
import React, { useState } from "react";
import axios from "axios";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", email, "username:", username, "and password:", password);

    try {
      const response = await axios.post("http://localhost:5001/register", { email, password, username });
      console.log("Backend response:", response.data); // Log the response from backend
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error);
      setResponseMessage(error.response?.data?.message || "Registration failed");
    }
  };
  
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default Register;


// //ok before apply hashing
// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted with email:", email, "username:", username, "and password:", password);

//     try {
//       const response = await axios.post("http://localhost:5001/register", { email, password, username });
//       console.log("Backend response:", response.data); // Log the response from backend
//       setResponseMessage(response.data.message);
//     } catch (error) {
//       console.error("Error registering user:", error.response?.data || error);
//       setResponseMessage(error.response?.data?.message || "Registration failed");
//     }
//   };
  
//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}  
//         />
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
//         <button type="submit">Register</button>
//       </form>
//       {responseMessage && <p>{responseMessage}</p>}
//     </div>
//   );
// }

// export default Register;




// //below for verifying Frontend Request, not sending to DB
// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [responseMessage, setResponseMessage] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     const user = {
//       email: "testuser@example.com",
//       password: "password123",
//       username: "testuser"
//     };
  
//     try {
//       const response = await axios.post("http://localhost:5001/register", user);
//       console.log("Registration success:", response.data);
//     } catch (error) {
//       console.error("Error registering user:", error.response.data);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
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
//         <button type="submit">Register</button>
//       </form>
//       {responseMessage && <p>{responseMessage}</p>}
//     </div>
//   );
// }

// export default Register;





// import React, { useState } from "react";

// const RegisterPage = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRegister = () => {
//     // Simulate registration logic (replace with actual logic)
//     setMessage("Registration successful! Please log in.");
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       {message && <div className="message">{message}</div>}
//       <input 
//         type="text" 
//         value={username} 
//         onChange={e => setUsername(e.target.value)} 
//         placeholder="Username" 
//       />
//       <input 
//         type="email" 
//         value={email} 
//         onChange={e => setEmail(e.target.value)} 
//         placeholder="Email" 
//       />
//       <input 
//         type="password" 
//         value={password} 
//         onChange={e => setPassword(e.target.value)} 
//         placeholder="Password" 
//       />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

// export default RegisterPage;
