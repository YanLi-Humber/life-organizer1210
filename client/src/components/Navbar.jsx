import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CatImage from './CatImage';

function Navbar({ authState, setAuthState }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    // Update auth state and redirect
    setAuthState({ isLoggedIn: false, user: null });
    navigate("/login");
  };

  return (
    <>
    <header>
        <h1>Welcome to Life Organizer</h1>
      </header>
      <CatImage />
    <nav>
      <ul>
        {authState.isLoggedIn ? (
          <>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/tasksearch">Task Search</Link></li>
            <li><Link to="/organizer">Organizer</Link></li>
            <li><Link to="/create-event">Create Event</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>

    </nav>
    </>
  );
}

export default Navbar;










// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar({ isLoggedIn, setIsLoggedIn }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav>
//       <ul>
//         {isLoggedIn ? (
//           <>
//             <li><Link to="/home">Home</Link></li>
//             <li><button onClick={handleLogout}>Logout</button></li>
//           </>
//         ) : (
//           <>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;













// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const currentTime = new Date().toLocaleString("en-US", { timeZone: user?.timeZone || "America/Toronto" });

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/organizer">Organizer</Link></li>
//         <li><Link to="/settings">Settings</Link></li>
//         <li><Link to="/sources">Sources</Link></li>
//         <li>{user?.username}</li>
//         <li>{currentTime}</li>
//         <li><button onClick={handleLogout}>Logout</button></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
