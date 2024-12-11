import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'; // You can add basic CSS for styling
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Organizer from './pages/Organizer';
import TaskSearch from './pages/TaskSearch';

import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Example Home page
import CreateEvent from "./pages/CreateEvent";
import Calendar from "./pages/Calendar";
import Footer from './components/Footer'; 
import CatImage from './components/CatImage'; 

function App() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setAuthState({
        isLoggedIn: true,
        user: user,
      });
    }
  }, []);

  return (
    <Router>
      {/* <CatImage /> */}
      <Navbar authState={authState} setAuthState={setAuthState} />
      <Routes>
        <Route path="/login" element={<Login setAuthState={setAuthState} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/tasksearch" element={<TaskSearch />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;




// function App() {
//     const [username, setUsername] = useState(""); // Initialize username

//     const [authStatus, setAuthStatus] = useState(null); // Track authentication status
  
//     useEffect(() => {
//       console.log("App component mounted"); // Check when the component is loaded
//     }, []);


//   return (
//     <Router>
//       <div className="App">
//       <h1>Life Organizer App</h1>
//         <nav>
//           <ul className="nav-list">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/settings">Settings</Link></li>
//             <li><Link to="/view-organizer">View Organizer</Link></li>
//             <li><Link to="/task-search">Task Search</Link></li>
//           </ul>
//           <div className="nav-status">
//             {username ? (
//               <>
//                 <span>{username}</span>
//                 <span>{currentDate.toLocaleString()}</span>
//               </>
//             ) : (
//               <span>Not logged in</span>
//             )}
//           </div>
//         </nav>

//         <Routes>
//           <Route path="/" element={<div>Welcome to Life Organizer</div>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/view-organizer" element={<Organizer />} />
//           <Route path="/task-search" element={<TaskSearch />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;




// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import './App.css'; // You can add basic CSS for styling
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Settings from './pages/Settings';
// import Organizer from './pages/Organizer';
// import TaskSearch from './pages/TaskSearch';

// const App = () => {
//   const [username, setUsername] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 1000); // Update time every second
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <nav>
//           <ul className="nav-list">
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/settings">Settings</Link></li>
//             <li><Link to="/view-organizer">View Organizer</Link></li>
//             <li><Link to="/task-search">Task Search</Link></li>
//           </ul>
//           <div className="nav-status">
//             {username ? (
//               <>
//                 <span>{username}</span>
//                 <span>{currentDate.toLocaleString()}</span>
//               </>
//             ) : (
//               <span>Not logged in</span>
//             )}
//           </div>
//         </nav>

//         <Routes>
//           <Route path="/" element={<div>Welcome to Life Organizer</div>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/view-organizer" element={<Organizer />} />
//           <Route path="/task-search" element={<TaskSearch />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
