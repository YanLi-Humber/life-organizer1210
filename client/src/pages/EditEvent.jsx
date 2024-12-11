import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => setFormData(response.data))
      .catch((error) => setResponseMessage("Failed to load event data"));
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5001/events/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setResponseMessage(response.data.message || "Event updated successfully!");
      setTimeout(() => navigate("/organizer"), 2000);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Event update failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="event-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Event</button>
      </form>
      {responseMessage && <p className="message">{responseMessage}</p>}
    </div>
  );
}

export default EditEvent;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';

// const EditEvent = ({ user }) => {
//     const { id } = useParams(); // Get event ID from the URL
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: '',
//         startDate: '',
//         startTime: '',
//         endDate: '',
//         endTime: '',
//         category: '',
//         partiesInvolved: '',
//         dueDate: '',
//         progress: '',
//         completionLevel: 0,
//         remark: '',
//         important: false,
//     });
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axiosInstance.get(`/events/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setFormData({
//                     ...res.data,
//                     startDate: res.data.startDate.split('T')[0], // Ensure date is in `YYYY-MM-DD` format
//                     endDate: res.data.endDate ? res.data.endDate.split('T')[0] : '',
//                     dueDate: res.data.dueDate ? res.data.dueDate.split('T')[0] : '',
//                 });
//             } catch (err) {
//                 console.error('Error fetching event:', err.message);
//                 setMessage('Error fetching event. Please try again.');
//             }
//         };
//         fetchEvent();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//     };

//     const cancelEdit = () => {
//         navigate('/events'); // Redirect to the events list or desired page
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             await axiosInstance.put(`/events/${id}`, formData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessage('Event updated successfully!');
//             navigate('/events'); // Redirect back to events list
//         } catch (err) {
//             console.error('Error updating event:', err.message);
//             setMessage('Error updating event. Please try again.');
//         }
//     };

//     if (!user) {
//         return <p>Please log in to edit events.</p>;
//     }

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h2>Edit Event</h2>
//             <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Event Name:</label>
//                     <input
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Start Date:</label>
//                     <input
//                         name="startDate"
//                         type="date"
//                         value={formData.startDate}
//                         onChange={handleChange}
//                         required
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Start Time:</label>
//                     <input
//                         name="startTime"
//                         type="time"
//                         value={formData.startTime}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>End Date:</label>
//                     <input
//                         name="endDate"
//                         type="date"
//                         value={formData.endDate}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div>
//                     <label>End Time:</label>

//                     <input
//                         name="endTime"
//                         type="time"
//                         value={formData.endTime}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Category:</label>
//                     <select
//                         name="category"
//                         value={formData.category}
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
//                     <label>Parties Involved:</label>
//                     <textarea
//                         name="partiesInvolved"
//                         value={formData.partiesInvolved}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Due Date:</label>
//                     <input
//                         name="dueDate"
//                         type="date"
//                         value={formData.dueDate}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Progress:</label>
//                     <select
//                         name="progress"
//                         value={formData.progress}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     >
//                         <option value="Not started">Not started</option>
//                         <option value="In progress">In progress</option>
//                         <option value="Completed">Completed</option>
//                     </select>
//                 </div>
//                 {formData.progress === 'In progress' && (
//                     <div style={{ marginBottom: '10px' }}>
//                         <label>Completion Level% (1-99):</label>
//                         <input
//                             name="completionLevel"
//                             type="number"
//                             value={formData.completionLevel}
//                             onChange={handleChange}
//                             min="1"
//                             max="99"
//                             style={{ display: 'block', width: '100%' }}
//                         />
//                     </div>
//                 )}
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Remark:</label>
//                     <textarea
//                         name="remark"
//                         value={formData.remark}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>
//                         Important:
//                         <input
//                             name="important"
//                             type="checkbox"
//                             checked={formData.important}
//                             onChange={handleChange}
//                             style={{ marginLeft: '10px' }}
//                         />
//                     </label>
//                 </div>
//                 <button type="submit" style={{ padding: '10px 20px' }}>
//                     Save Changes
//                 </button>
//                 <button type="button" onClick={cancelEdit} style={{ padding: '10px 20px', marginLeft: '10px' }}>
//                     Cancel
//                 </button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default EditEvent;
