import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const CreateEvent = ({ user }) => {
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        category: '',
        partiesInvolved: '',
        dueDate: '',
        progress: 'Not started',
        completionLevel: 0,
        remark: '',
        important: false,
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        if (!formData.name || !formData.startDate) {
            setMessage('Event name and start date are required.');
            return;
        }

    // Send the date exactly as entered in the form (local time)
  //   const formatISODate = (date, time) => {
  //     return time ? `${date}T${time}:00.000Z` : `${date}T00:00:00.000Z`;
  // };
  
//   const formatISODate = (date, time) => {
//     return new Date(`${date}T${time || '00:00'}`).toISOString();
// };

  
//   const payload = {
//       ...formData,
//       startDate: formatISODate(formData.startDate, formData.startTime),
//       endDate: formData.endDate
//           ? formatISODate(formData.endDate, formData.endTime)
//           : null,
//   };
  



//if need to return to previous, use below set
    //     try {
    //         const token = localStorage.getItem('token'); // Retrieve the token
    //         const response = await axiosInstance.post('/events/create', formData, {
    //             headers: { Authorization: `Bearer ${token}` }, // Include the token in the headers
    //         });

    //         setMessage('Event created successfully!');
    //         // res.status(201).json({ success: true, message: 'Event created successfully', event: newEvent }); (can consider use this if have time cause need to apply to all others)

    //         console.log('Event created:', response.data);
    //     } catch (err) {
    //         console.error('Error creating event:', err.response?.data || err.message);
    //         setMessage('Error creating event. Please try again.');
    //     }
    // };


          try {
            const timeZone = 'America/Toronto'; // Replace with the desired timezone
            const startDateTime = new Date(`${formData.startDate}T${formData.startTime || '00:00'}:00`);
            const endDateTime = formData.endDate
              ? new Date(`${formData.endDate}T${formData.endTime || '00:00'}:00`)
              : null;

            const payload = {
              ...formData,
              startDate: startDateTime.toISOString(),
              endDate: endDateTime ? endDateTime.toISOString() : null,
            };

          const token = localStorage.getItem('token');
          const response = await axiosInstance.post('/events/create', payload, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setMessage('Event created successfully!');
          console.log('Event created:', response.data);
    } catch (err) {
          console.error('Error creating event:', err.response?.data || err.message);
          setMessage('Error creating event. Please try again.');
    };
  }


    if (!user) {
        return <p>Please log in to create events.</p>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Event Name:</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ display: 'block', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Start Date:</label>
                    <input
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        style={{ display: 'block', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Start Time:</label>
                    <input
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label>End Date:</label>
                    <input
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%' }}
                    />
                  </div>
                  <div>
                 <label>End Time:</label>
                
                  <input
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%' }}
                 />
                 </div>
                 <div style={{ marginBottom: '10px' }}>
                  <label>Category:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%' }}
                  >
                    <option value="">Select Category</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Personal">Personal</option>
                    <option value="Unclassified">Unclassified</option>
                  </select>
                </div>
                  <div style={{ marginBottom: '10px' }}>
                  <label>Parties Involved:</label>
                  <textarea
                    name="partiesInvolved"
                    value={formData.partiesInvolved}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%' }}
                  />
                  </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>Due Date:</label>
                  <input
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%' }}
                  />
                </div>
                        <div style={{ marginBottom: '10px' }}>
                  <label>Progress:</label>
                  <select
                    name="progress"
                    value={formData.progress}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%' }}
                  >
                        <option value="Not started">Not started</option>
                        <option value="In progress">In progress</option>
                        <option value="Completed">Completed</option>
                  </select>
                </div>
                {formData.progress === 'In progress' && (
                  <div style={{ marginBottom: '10px' }}>
                    <label>Completion Level% (1-99):</label>
                    <input
                      name="completionLevel"
                      type="number"
                      value={formData.completionLevel}
                      onChange={handleChange}
                      min="1"
                      max="99"
                      style={{ display: 'block', width: '100%' }}
                    />
                  </div>
                )}
                  <div style={{ marginBottom: '10px' }}>
                  <label>Remark:</label>
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    style={{ display: 'block', width: '100%' }}
                  />
                </div>
                  <div style={{ marginBottom: '10px' }}>
                  <label>
                    Important:
                    <input
                      name="important"
                      type="checkbox"
                      checked={formData.important}
                      onChange={handleChange}
                      style={{ marginLeft: '10px' }}
                    />
                  </label>
                </div>

                <button type="submit" style={{ padding: '10px 20px' }}>Create Event</button>
                <button type="button" onClick={clearResults} style={{ padding: '10px 20px', marginLeft: '10px' }}>Clear</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateEvent;


// import React, { useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';

// const CreateEvent = ({ user }) => {
//     const [eventData, setEventData] = useState({
//         name: '',
//         category: '',
//         date: '',
//         time: '',
//         important: false,
//     });
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setEventData({ ...eventData, [name]: type === 'checkbox' ? checked : value });
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       const token = localStorage.getItem('token'); // Get the token from local storage
//       if (!token) {
//           setMessage('You must log in to create an event.');
//           return;
//       }
  
//       try {
//           const res = await axiosInstance.post('/events/create', formData, {
//               headers: {
//                   Authorization: `Bearer ${token}`, // Ensure Bearer token format
//               },
//           });
//           setMessage('Event created successfully!');
//       } catch (err) {
//           console.error('Error creating event:', err.response?.data || err.message);
//           setMessage(err.response?.data.message || 'Error creating event. Please try again.');
//       }
//   };
  

//     if (!user) {
//         return <p>Please log in to create events.</p>;
//     }

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h2>Create Event</h2>
//             <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Event Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={eventData.name}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Category:</label>
//                     <select
//                         name="category"
//                         value={eventData.category}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     >
//                         <option value="">Select Category</option>
//                         <option value="Work">Work</option>
//                         <option value="School">School</option>
//                         <option value="Family">Family</option>
//                         <option value="Friend">Friend</option>
//                         <option value="Personal">Personal</option>
//                     </select>
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Date:</label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={eventData.date}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Time:</label>
//                     <input
//                         type="time"
//                         name="time"
//                         value={eventData.time}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Important:</label>
//                     <input
//                         type="checkbox"
//                         name="important"
//                         checked={eventData.important}
//                         onChange={handleChange}
//                         style={{ marginLeft: '10px' }}
//                     />
//                 </div>
//                 <button type="submit" style={{ padding: '10px 20px' }}>Create Event</button>
//             </form>
//             {message && <p style={{ color: 'red' }}>{message}</p>}
//         </div>
//     );
// };

// export default CreateEvent;




// import React, { useState } from 'react';
// // import axios from 'axios';
// import axiosInstance from '../utils/axiosInstance';

// const CreateEvent = ({ user }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     startDate: '',
//     startTime: '',
//     endDate: '',
//     endTime: '',
//     category: '',
//     partiesInvolved: '',
//     dueDate: '',
//     progress: 'Not started',
//     completionLevel: 0,
//     remark: '',
//     important: false,
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form Data:', JSON.stringify(formData, null, 2));
//     console.log('Submitting form data:', formData); // Debugging the form data

//     if (!formData.name || !formData.startDate) {
//       setMessage('Event name and start date are required.');
//       return;
//     }

//     // Log the token to ensure it's not null
//     const token = localStorage.getItem('token');
//     console.log("Token:", token);

//     if (!token) {
//       setMessage('Token is missing. Please log in.');
//       return;
//     }

//     try {
//       const res = await axiosInstance.post('/events/create', formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
//        'Content-Type': 'application/json',
//      },
//       });

//       setMessage(res.data.message); // Show success message from backend
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message || 'Error creating event. Please try again.';
//       setMessage(errorMessage);
//     }
//   };
//   //     try 
//   //         // const token = localStorage.getItem('token');
//   //         // await axios.post('/api/events/create', formData, {
//   //         //     headers: { Authorization: `Bearer ${token}` },
//   //         // });
//   //         {
//   //           const token = localStorage.getItem('token');
//   //           const res = await axiosInstance.post('/events/create', formData, {
//   //               headers: { Authorization: `Bearer ${token}` },
//   //           });
//   //         setMessage('Event created successfully!');
//   //     } catch (err) {
//   //         setMessage('Error creating event. Please try again.');
//   //     }
//   // };

//   if (!user) {
//     return <p>Please log in to create events.</p>;
//   }

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       <h2>Create Event</h2>
//       <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Event Name:</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Start Date:</label>
//           <input
//             name="startDate"
//             type="date"
//             value={formData.startDate}
//             onChange={handleChange}
//             required
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Start Time:</label>
//           <input
//             name="startTime"
//             type="time"
//             value={formData.startTime}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>End Date:</label>
//           <input
//             name="endDate"
//             type="date"
//             value={formData.endDate}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>End Time:</label>
//           <input
//             name="endTime"
//             type="time"
//             value={formData.endTime}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Category:</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           >
//             <option value="">Select Category</option>
//             <option value="Work">Work</option>
//             <option value="School">School</option>
//             <option value="Family">Family</option>
//             <option value="Friend">Friend</option>
//             <option value="Personal">Personal</option>
//             <option value="Unclassified">Unclassified</option>
//           </select>
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Parties Involved:</label>
//           <textarea
//             name="partiesInvolved"
//             value={formData.partiesInvolved}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Due Date:</label>
//           <input
//             name="dueDate"
//             type="date"
//             value={formData.dueDate}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>Progress:</label>
//           <select
//             name="progress"
//             value={formData.progress}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           >
//             <option value="Not started">Not started</option>
//             <option value="In progress">In progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>
//         {formData.progress === 'In progress' && (
//           <div style={{ marginBottom: '10px' }}>
//             <label>Completion Level:</label>
//             <input
//               name="completionLevel"
//               type="number"
//               value={formData.completionLevel}
//               onChange={handleChange}
//               min="1"
//               max="99"
//               style={{ display: 'block', width: '100%' }}
//             />
//           </div>
//         )}
//         <div style={{ marginBottom: '10px' }}>
//           <label>Remark:</label>
//           <textarea
//             name="remark"
//             value={formData.remark}
//             onChange={handleChange}
//             style={{ display: 'block', width: '100%' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>
//             Important:
//             <input
//               name="important"
//               type="checkbox"
//               checked={formData.important}
//               onChange={handleChange}
//               style={{ marginLeft: '10px' }}
//             />
//           </label>
//         </div>
//         <button type="submit" style={{ padding: '10px 20px' }}>Create Event</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default CreateEvent;


// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateEvent = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     startDate: '',
//     startTime: '',
//     endDate: '',
//     endTime: '',
//     category: '',
//     partiesInvolved: '',
//     dueDate: '',
//     progress: 'Not started',
//     completionLevel: 0,
//     remark: '',
//     important: false,
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post('http://localhost:8001/api/events/create', formData, {
//         headers: { Authorization: token },
//       });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response.data.message || 'Error creating event');
//     }
//   };

//   return (
//     <div>
//       <h2>Create Event</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Event Name:
//           <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
//         </label>
//         <label>
//           Start Date:
//           <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
//         </label>
//         <label>
//           Start Time:
//           <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} />
//         </label>
//         <label>
//           End Date:
//           <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
//         </label>
//         <label>
//           End Time:
//           <input name="endTime" type="time" value={formData.endTime} onChange={handleChange} />
//         </label>
//         <label>
//           Category:
//           <select name="category" value={formData.category} onChange={handleChange}>
//             <option value="">Select Category</option>
//             <option value="Work">Work</option>
//             <option value="School">School</option>
//             <option value="Family">Family</option>
//             <option value="Friend">Friend</option>
//             <option value="Personal">Personal</option>
//             <option value="Unclassified">Unclassified</option>
//           </select>
//         </label>
//         <label>
//           Parties Involved:
//           <textarea name="partiesInvolved" placeholder="Parties Involved" value={formData.partiesInvolved} onChange={handleChange} />
//         </label>
//         <label>
//           Due Date:
//           <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
//         </label>
//         <label>
//           Progress:
//           <select name="progress" value={formData.progress} onChange={handleChange}>
//             <option value="Not started">Not started</option>
//             <option value="In progress">In progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </label>
//         {formData.progress === 'In progress' && (
//           <label>
//             Completion Level:
//             <input name="completionLevel" type="number" value={formData.completionLevel} onChange={handleChange} min="0" max="99" />
//           </label>
//         )}
//         <label>
//           Remark:
//           <textarea name="remark" placeholder="Remark" value={formData.remark} onChange={handleChange} />
//         </label>
//         <label>
//           Important:
//           <input name="important" type="checkbox" checked={formData.important} onChange={handleChange} />
//         </label>
//         <button type="submit">Create Event</button>
//       </form>

//       {/* <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} required />
//         <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
//         <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} />
//         <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
//         <input name="endTime" type="time" value={formData.endTime} onChange={handleChange} />
//         <select name="category" value={formData.category} onChange={handleChange}>
//           <option value="">Select Category</option>
//           <option value="Work">Work</option>
//           <option value="School">School</option>
//           <option value="Family">Family</option>
//           <option value="Friend">Friend</option>
//           <option value="Personal">Personal</option>
//           <option value="Unclassified">Unclassified</option>
//         </select>
//         <textarea name="partiesInvolved" placeholder="Parties Involved" value={formData.partiesInvolved} onChange={handleChange} />
//         <input name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
//         <div>
//           <label>
//             Progress:
//             <select name="progress" value={formData.progress} onChange={handleChange}>
//               <option value="Not started">Not started</option>
//               <option value="In progress">In progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </label>
//         </div>
//         {formData.progress === 'In progress' && (
//           <input name="completionLevel" type="number" value={formData.completionLevel} onChange={handleChange} min="0" max="99" />
//         )}
//         <textarea name="remark" placeholder="Remark" value={formData.remark} onChange={handleChange} />
//         <label>
//           Important:
//           <input name="important" type="checkbox" checked={formData.important} onChange={handleChange} />
//         </label>
//         <button type="submit">Create Event</button>
//       </form> */}
//       <p>{message}</p>
//     </div>
//   );
// };

// export default CreateEvent;
