import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskSearch() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events");
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        new Date(event.date).toLocaleDateString().includes(query)
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="task-search-container">
      <h2>Search Events</h2>
      <input
        type="text"
        placeholder="Search by title, description, or date"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredEvents.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSearch;



// import React, { useState } from 'react';
// // import axios from 'axios';
// import axiosInstance from '../utils/axiosInstance';


// const TaskSearch = ({ user }) => {
//     const [criteria, setCriteria] = useState({
//         name: '',
//         category: '',
//         startDate: '',
//         endDate: '',
//         important: false,
//         progress: '',
//         dueDate: '',
//     });
//     const [results, setResults] = useState([]);
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setCriteria({ ...criteria, [name]: type === 'checkbox' ? checked : value });
//     };

//     const clearResults = () => {
//         setResults([]);
//         setCriteria({
//             name: '',
//             category: '',
//             startDate: '',
//             endDate: '',
//             important: false,
//             progress: '',
//             dueDate: '',
//         });
//         setMessage('');
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const res = await axiosInstance.post('/events/search', criteria, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
    
//             // Convert dates to the local time zone
//             const events = res.data.map((event) => ({
//                 ...event,
//                 startDate: event.startDate
//                     ? new Date(event.startDate).toLocaleDateString('en-CA', { timeZone: 'America/Toronto' })
//                     : null,
//                 endDate: event.endDate
//                     ? new Date(event.endDate).toLocaleDateString('en-CA', { timeZone: 'America/Toronto' })
//                     : null,
//             }));
    
//             setResults(events);
//         } catch (err) {
//             console.error('Error fetching tasks:', err.message);
//             setMessage('Error fetching tasks. Please try again.');
//         }
//     };
    

//     if (!user) {
//         return <p>Please log in to search for tasks.</p>;
//     }

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h2>Task Search</h2>
//             <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={criteria.name}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Category:</label>
//                     <select
//                         name="category"
//                         value={criteria.category}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     >
//                         <option value="">Select Category</option>
//                         <option value="Work">Work</option>
//                         <option value="School">School</option>
//                         <option value="Family">Family</option>
//                         <option value="Friend">Friend</option>
//                         <option value="Personal">Personal</option>
//                         <option value="Unclassified">Unclassified</option>
//                     </select>
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Start Date:</label>
//                     <input
//                         type="date"
//                         name="startDate"
//                         value={criteria.startDate}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>End Date:</label>
//                     <input
//                         type="date"
//                         name="endDate"
//                         value={criteria.endDate}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>
//                         Important:
//                         <input
//                             type="checkbox"
//                             name="important"
//                             checked={criteria.important}
//                             onChange={handleChange}
//                             style={{ marginLeft: '10px' }}
//                         />
//                     </label>
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Progress:</label>
//                     <select
//                         name="progress"
//                         value={criteria.progress}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     >
//                         <option value="">Select Progress</option>
//                         <option value="Not started">Not started</option>
//                         <option value="In progress">In progress</option>
//                         <option value="Completed">Completed</option>
//                     </select>
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Due Date:</label>
//                     <input
//                         type="date"
//                         name="dueDate"
//                         value={criteria.dueDate}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <button type="submit" style={{ padding: '10px 20px' }}>Search</button>
//                 <button type="button" onClick={clearResults} style={{ padding: '10px 20px', marginLeft: '10px' }}>
//         Clear
//     </button>
//             </form>
//             {message && <p style={{ color: 'red' }}>{message}</p>}
//             {results.length > 0 && (
//                 <ul style={{ marginTop: '20px', listStyleType: 'none', padding: 0 }}>
//                     {results.map((task) => (
//                         <li key={task._id} style={{ marginBottom: '10px' }}>
//                             {task.name} - {new Date(task.startDate).toLocaleDateString()}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default TaskSearch;












// import React, { useState } from 'react';
// import axios from 'axios';

// const TaskSearch = () => {
//   const [criteria, setCriteria] = useState({
//     name: '',
//     periodStart: '',
//     periodEnd: '',
//     category: '',
//     partiesInvolved: false,
//     important: false,
//     progress: '',
//     dueStatus: '',
//     withRemarks: false,
//   });
//   const [events, setEvents] = useState([]);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCriteria({ ...criteria, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('http://localhost:8001/api/events/search', {
//         headers: { Authorization: token },
//         params: criteria,
//       });
//       setEvents(res.data);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error fetching tasks');
//     }
//   };

//   return (
//     <div>
//       <h2>Task Search</h2>
//       <p>Search for events using various criteria.</p>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Event Name" onChange={handleChange} />
//         <input name="periodStart" type="date" onChange={handleChange} />
//         <input name="periodEnd" type="date" onChange={handleChange} />
//         <select name="category" onChange={handleChange}>
//           <option value="">Select Category</option>
//           <option value="Work">Work</option>
//           <option value="School">School</option>
//           <option value="Family">Family</option>
//           <option value="Friend">Friend</option>
//           <option value="Personal">Personal</option>
//           <option value="Unclassified">Unclassified</option>
//         </select>
//         <label>
//           <input name="partiesInvolved" type="checkbox" onChange={handleChange} />
//           Other Parties Involved
//         </label>
//         <label>
//           <input name="important" type="checkbox" onChange={handleChange} />
//           Important
//         </label>
//         <select name="progress" onChange={handleChange}>
//           <option value="">Select Progress</option>
//           <option value="Not started">Not started</option>
//           <option value="In progress">In progress</option>
//           <option value="Completed">Completed</option>
//         </select>
//         <select name="dueStatus" onChange={handleChange}>
//           <option value="">Select Due Status</option>
//           <option value="overdue">Overdue</option>
//           <option value="dueToday">Due Today</option>
//           <option value="notDue">Not Due</option>
//           <option value="noDueDate">No Due Date</option>
//         </select>
//         <label>
//           <input name="withRemarks" type="checkbox" onChange={handleChange} />
//           With Remarks
//         </label>
//         <button type="submit">Search</button>
//       </form>
//       <p>{message}</p>
//       <div>
//         {events.map((event) => (
//           <div key={event._id}>
//             <strong>{event.name}</strong>
//             <p>{new Date(event.startDate).toLocaleDateString()}</p>
//             {event.dueDate && <p>Due: {new Date(event.dueDate).toLocaleDateString()}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskSearch;
