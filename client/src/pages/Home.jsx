import React, { useState, useEffect } from "react";
import axios from "axios";

function Home({ authState }) {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fetch existing tasks/events on load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!authState?.token) {
          console.error("Token missing. Redirecting to login...");
          window.location.href = "/login";
          return;
        }
        const response = await axios.get("http://localhost:5001/events", {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error.response?.data || error.message);
      }
    };

    fetchEvents();
  }, [authState?.token]);

  // Handle creating a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) {
      alert("Please provide both title and date for the event.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/events",
        { title: newEvent.title, date: newEvent.date },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      setEvents([...events, response.data]);
      setNewEvent({ title: "", date: "" });
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/events/${id}`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error.response?.data || error.message);
    }
  };

  // Handle search functionality
  useEffect(() => {
    if (searchQuery) {
      const filtered = events.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(events);
    }
  }, [searchQuery, events]);

  // Handle updating an event
  const handleUpdateEvent = async (id, updatedTitle) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/events/${id}`,
        { title: updatedTitle },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      setEvents(events.map((event) => (event.id === id ? response.data : event)));
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error.message);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage data
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <div>
      <h2>Welcome, {authState?.user?.username || "User"}</h2>
      <button onClick={handleLogout}>Logout</button>

      {/* Create Event */}
      <div>
        <h3>Create Event</h3>
        <form onSubmit={handleCreateEvent}>
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <button type="submit">Add Event</button>
        </form>
      </div>

      {/* Task Search */}
      <div>
        <h3>Task Search</h3>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Task List */}
      <div>
        <h3>Task List</h3>
        {filteredTasks.map((task) => (
          <div key={task.id} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={task.title}
              onChange={(e) => handleUpdateEvent(task.id, e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <button onClick={() => handleDeleteEvent(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


// import React, { useEffect } from 'react';

// const Home = () => {
//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Retrieve token
//     if (!token) {
//       console.error('Token not found! Redirecting to login...');
//       window.location.href = '/login'; // Redirect if token is missing
//     } else {
//       console.log('Token:', token); // Use token for further API calls
//     }
//   }, []);

//   return (
//     <div>
//       <h1>Welcome to Home</h1>
//     </div>
//   );
// };

// export default Home;












// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Home({ authState }) {
//   const [events, setEvents] = useState([]);
//   const [newEvent, setNewEvent] = useState({ title: "", date: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredTasks, setFilteredTasks] = useState([]);

//   // Fetch existing tasks/events on load
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/events", {
//           headers: { Authorization: `Bearer ${authState.token}` },
//         });
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error.response?.data || error.message);
//       }
//     };

//     fetchEvents();
//   }, [authState.token]);

//   // Handle creating a new event
//   const handleCreateEvent = async (e) => {
//     e.preventDefault();
//     if (!newEvent.title || !newEvent.date) {
//       alert("Please provide both title and date for the event.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5001/events",
//         { title: newEvent.title, date: newEvent.date },
//         { headers: { Authorization: `Bearer ${authState.token}` } }
//       );
//       setEvents([...events, response.data]);
//       setNewEvent({ title: "", date: "" });
//     } catch (error) {
//       console.error("Error creating event:", error.response?.data || error.message);
//     }
//   };

//   // Handle deleting an event
//   const handleDeleteEvent = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5001/events/${id}`, {
//         headers: { Authorization: `Bearer ${authState.token}` },
//       });
//       setEvents(events.filter((event) => event.id !== id));
//     } catch (error) {
//       console.error("Error deleting event:", error.response?.data || error.message);
//     }
//   };

//   // Handle search functionality
//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = events.filter((task) =>
//         task.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredTasks(filtered);
//     } else {
//       setFilteredTasks(events);
//     }
//   }, [searchQuery, events]);

//   // Handle updating an event
//   const handleUpdateEvent = async (id, updatedTitle) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5001/events/${id}`,
//         { title: updatedTitle },
//         { headers: { Authorization: `Bearer ${authState.token}` } }
//       );
//       setEvents(events.map((event) => (event.id === id ? response.data : event)));
//     } catch (error) {
//       console.error("Error updating event:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Home</h2>

//       {/* Create Event */}
//       <div>
//         <h3>Create Event</h3>
//         <form onSubmit={handleCreateEvent}>
//           <input
//             type="text"
//             placeholder="Event Title"
//             value={newEvent.title}
//             onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//           />
//           <input
//             type="date"
//             value={newEvent.date}
//             onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//           />
//           <button type="submit">Add Event</button>
//         </form>
//       </div>

//       {/* Task Search */}
//       <div>
//         <h3>Task Search</h3>
//         <input
//           type="text"
//           placeholder="Search tasks"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Task List */}
//       <div>
//         <h3>Task List</h3>
//         {filteredTasks.map((task) => (
//           <div key={task.id} style={{ marginBottom: "10px" }}>
//             <input
//               type="text"
//               value={task.title}
//               onChange={(e) => handleUpdateEvent(task.id, e.target.value)}
//               style={{ marginRight: "10px" }}
//             />
//             <button onClick={() => handleDeleteEvent(task.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;




