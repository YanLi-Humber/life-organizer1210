
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Organizer() {
  const [events, setEvents] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        setResponseMessage("Failed to fetch events");
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5001/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setEvents(events.filter((event) => event._id !== eventId));
      setResponseMessage("Event deleted successfully");
    } catch (error) {
      setResponseMessage("Failed to delete event");
    }
  };

  return (
    <div className="organizer-container">
      <h2>Your Events</h2>
      {responseMessage && <p className="message">{responseMessage}</p>}
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <button onClick={() => navigate(`/edit-event/${event._id}`)}>Edit</button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Organizer;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Organizer = ({ user }) => {
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [events, setEvents] = useState([]);
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
//             setMessage('Please provide a valid date range.');
//             return;
//         }
//         try {
//             const token = localStorage.getItem('token');
//             const res = await axios.get(`/api/events?start=${startDate}&end=${endDate}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setEvents(res.data);
//             setMessage('');
//         } catch (err) {
//             console.error('Error fetching events:', err.message);
//             setMessage('Error fetching events. Please try again.');
//         }
//     };
    

//     if (!user) {
//         return <p>Please log in to view your organizer.</p>;
//     }

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h2>{user.username}'s Organizer</h2>
//             <form onSubmit={handleSubmit} style={{ marginBottom: '20px', textAlign: 'left', display: 'inline-block' }}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Start Date:</label>
//                     <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                         required
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>End Date:</label>
//                     <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                         required
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
//                     Fetch Events
//                 </button>
//             </form>
//             {message && <p style={{ color: 'red' }}>{message}</p>}
//             {events.length > 0 ? (
//                 <table style={{ margin: '20px auto', borderCollapse: 'collapse', textAlign: 'left' }}>
//                     <thead>
//                         <tr>
//                             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                                 <th key={day} style={{ border: '1px solid #ccc', padding: '10px' }}>
//                                     {day}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {events.map((event, index) => (
//                             <tr key={index}>
//                                 <td style={{ border: '1px solid #ccc', padding: '10px' }}>
//                                     {event.name} - {new Date(event.startDate).toLocaleDateString()}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No events found for the selected range.</p>
//             )}
//         </div>
//     );
// };

// export default Organizer;
