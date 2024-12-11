import React, { useState } from "react";
import axios from "axios";

function Settings({ authState }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setResponseMessage("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5001/settings",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setResponseMessage(response.data.message || "Password updated successfully!");
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Password update failed");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="settings-container">
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
      {responseMessage && <p className="message">{responseMessage}</p>}
    </div>
  );
}

export default Settings;


// // import React, { useState, useEffect } from "react";
// // import axios from "../utils/axiosInstance";

// // const Settings = ({ user }) => {
// //     const [formData, setFormData] = useState({
// //         password: "",
// //         country: user?.country || "",
// //         timeZone: user?.timeZone || "",
// //     });

// //     const [year, setYear] = useState(new Date().getFullYear()); // Default to the current year
// //     const [holidays, setHolidays] = useState([]);
// //     const [message, setMessage] = useState("");
// //     const [countries, setCountries] = useState([]);

// //     // Fetch country list
// //     useEffect(() => {
// //         const fetchCountries = async () => {
// //             try {
// //                 const res = await axios.get("/holidays/countries");
// //                 setCountries(res.data);
// //             } catch (err) {
// //                 console.error("Error fetching countries:", err.message);
// //                 setMessage("Error fetching country list.");
// //             }
// //         };
// //         fetchCountries();
// //     }, []);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData({ ...formData, [name]: value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const token = localStorage.getItem("token");
// //             const res = await axios.put("/auth/settings", formData, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setMessage(res.data.message);
// //         } catch (err) {
// //             setMessage("Error updating settings. Please try again.");
// //         }
// //     };

// //     const fetchHolidays = async () => {
// //         if (!formData.country) {
// //             setMessage("Please select a country to fetch holidays.");
// //             return;
// //         }

// //         setMessage(`Fetching holidays for ${formData.country} in ${year}`);
// //         try {
// //             const res = await axios.get("/holidays", {
// //                 params: { country: formData.country, year },
// //             });
// //             setHolidays(res.data);
// //             setMessage("Holidays fetched successfully!");
// //         } catch (err) {
// //             console.error("Error fetching holidays:", err.message);
// //             setMessage("Error fetching holidays. Please try again.");
// //         }
// //     };

// //     if (!user) {
// //         return <p>Please log in to update your settings.</p>;
// //     }

// //     return (
// //         <div style={{ textAlign: "center", marginTop: "50px" }}>
// //             <h2>Settings</h2>
// //             <form onSubmit={handleSubmit} style={{ textAlign: "left", display: "inline-block" }}>
// //                 <div style={{ marginBottom: "10px" }}>
// //                     <label>Update Password:</label>
// //                     <input
// //                         type="password"
// //                         name="password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         style={{ display: "block", width: "100%" }}
// //                     />
// //                 </div>
// //                 <div style={{ marginBottom: "10px" }}>
// //                     <label>Country:</label>
// //                     <select
// //                         name="country"
// //                         value={formData.country}
// //                         onChange={handleChange}
// //                         style={{ display: "block", width: "100%" }}
// //                     >
// //                         <option value="">Select your country</option>
// //                         {countries.map((country) => (
// //                             <option key={country.code} value={country.code}>
// //                                 {country.name}
// //                             </option>
// //                         ))}
// //                     </select>
// //                 </div>
// //                 <div style={{ marginBottom: "10px" }}>
// //                     <label>Time Zone:</label>
// //                     <select
// //                         name="timeZone"
// //                         value={formData.timeZone}
// //                         onChange={handleChange}
// //                         style={{ display: "block", width: "100%" }}
// //                     >
// //                         <option value="">Select your time zone</option>
// //                         <option value="America/New_York">America/New_York</option>
// //                         <option value="America/Toronto">America/Toronto</option>
// //                     </select>
// //                 </div>
// //                 <button type="submit" style={{ padding: "10px 20px" }}>Save Changes</button>
// //             </form>
// //             {message && <p>{message}</p>}
// //             <div style={{ marginTop: "20px" }}>
// //                 <label htmlFor="year-select" style={{ marginRight: "10px" }}>
// //                     Select Year:
// //                 </label>
// //                 <select
// //                     id="year-select"
// //                     value={year}
// //                     onChange={(e) => setYear(parseInt(e.target.value, 10))}
// //                     style={{ padding: "5px", marginRight: "10px" }}
// //                 >
// //                     {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 25 + i).map(
// //                         (year) => (
// //                             <option key={year} value={year}>
// //                                 {year}
// //                             </option>
// //                         )
// //                     )}
// //                 </select>
// //                 <button onClick={fetchHolidays} style={{ padding: "10px 20px" }}>
// //                     Fetch Holidays
// //                 </button>
// //             </div>
// //             {holidays.length > 0 && (
// //                 <div style={{ marginTop: "20px", textAlign: "left" }}>
// //                     <h3>Public Holidays:</h3>
// //                     <ul>
// //                         {holidays.map((holiday, index) => (
// //                             <li key={index}>
// //                                 {holiday.name} - {holiday.date.iso}
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Settings;


// // working but only for 2024
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import axiosInstance from '../utils/axiosInstance';
// import calendarApi from '../utils/calendarApi'; // New axios instance for calendar-related APIs


// const Settings = ({ user, onLogout }) => {
//     const [formData, setFormData] = useState({
//         password: '',
//         country: user?.country || '',
//         timeZone: user?.timeZone || '',
//     });

//     const [year, setYear] = useState(new Date().getFullYear()); 
//     const [holidays, setHolidays] = useState([]);
//     const [message, setMessage] = useState('');
//     const [countries, setCountries] = useState([]);

//     // Fetch country list from backend
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await calendarApi.get('/api/holidays/countries');
//                 setCountries(res.data); // Populate country list
//             } catch (err) {
//                 console.error('Error fetching countries:', err.message);
//                 setMessage('Error fetching country list.');
//             }
//         };
//         fetchCountries();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const res = await axios.put('/api/auth/settings', formData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessage(res.data.message || 'Settings updated successfully!');
//         } catch (err) {
//             console.error('Error updating settings:', err.message);
//             setMessage('Error updating settings. Please try again.');
//         }
//     };

//     const fetchHolidays = async () => {
//         try {
//             const year = new Date().getFullYear();

//             if (!formData.country) {
//                 setMessage('Please select a country to fetch holidays.');
//                 return;
//             }

//             const res = await calendarApi.get('/api/holidays', {
//                 params: { country: formData.country, year },
//             });

//             // setHolidays(res.data.holidays); // Populate holidays
//             setHolidays(res.data); // Populate holidays
//             setMessage('Holidays fetched successfully!');
//         } catch (err) {
//             console.error('Error fetching holidays:', err.message);
//             setMessage('Error fetching holidays. Please try again.');
//         }
//     };

//     if (!user) {
//         return <p>Please log in to update your settings.</p>;
//     }

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h2>Settings</h2>

//             {/* Settings Form */}
//             <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Update Password:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '10px' }}>
//                     <label>Country:</label>
//                     <select
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     >
//                         <option value="">Select your country</option>
//                         {countries.map((country) => (
//                             <option key={country.code} value={country.code}>
//                                 {country.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 {/* <div style={{ marginBottom: '10px' }}>
//                     <label>Time Zone:</label>
//                     <select
//                         name="timeZone"
//                         value={formData.timeZone}
//                         onChange={handleChange}
//                         style={{ display: 'block', width: '100%' }}
//                     >
//                         <option value="">Select your time zone</option>
//                         <option value="America/New_York">America/New_York</option>
//                         <option value="America/Toronto">America/Toronto</option>
//                     </select>
//                 </div> */}
//                 <button type="submit" style={{ padding: '10px 20px' }}>Save Changes</button>
//             </form>

//             {/* Message Display */}
//             {message && <p style={{ marginTop: '10px' }}>{message}</p>}

//             {/* Fetch Holidays Button */}
//             <button onClick={fetchHolidays} style={{ padding: '10px 20px', marginTop: '20px' }}>
//                 Fetch Holidays
//             </button>
//             {holidays.length > 0 && (
//                 <div style={{ marginTop: '20px', textAlign: 'left' }}>
//                     <h3>Public Holidays:</h3>
//                     <ul>
//                         {holidays.map((holiday, index) => (
//                             <li key={index}>
//                                 <strong>{holiday.name}</strong> - {holiday.date.iso}
//                                 {holiday.description && <p>{holiday.description}</p>}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default Settings;


// //only drop down list working:
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const Settings = ({ user }) => {
// //     const [formData, setFormData] = useState({
// //         password: '',
// //         country: user?.country || '',
// //         timeZone: user?.timeZone || '',
// //     });
// //     const [message, setMessage] = useState('');
// //     const [countries, setCountries] = useState([]);

// //     // Fetch the list of countries
// //     useEffect(() => {
// //         const fetchCountries = async () => {
// //             try {
// //                 const res = await axios.get('/api/holidays/countries');
// //                 setCountries(res.data); // Set the list of countries
// //             } catch (err) {
// //                 console.error('Error fetching countries:', err.message);
// //                 setMessage('Error fetching country list.');
// //             }
// //         };
// //         fetchCountries();
// //     }, []);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData({ ...formData, [name]: value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const token = localStorage.getItem('token');
// //             const res = await axios.put('/api/auth/settings', formData, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setMessage(res.data.message);
// //         } catch (err) {
// //             setMessage('Error updating settings. Please try again.');
// //         }
// //     };

// //     const fetchHolidays = async () => {
// //         try {
// //             const year = new Date().getFullYear();

// //             if (!formData.country) {
// //                 setMessage('Please select a country to fetch holidays.');
// //                 return;
// //             }

// //             const res = await axios.get('/api/holidays', {
// //                 params: { country: formData.country, year },
// //             });
// //             console.log('Holidays:', res.data); // Display holidays
// //             setMessage('Holidays fetched successfully!');
// //         } catch (err) {
// //             console.error('Error fetching holidays:', err.message);
// //             setMessage('Error fetching holidays. Please try again.');
// //         }
// //     };

// //     if (!user) {
// //         return <p>Please log in to update your settings.</p>;
// //     }

// //     return (
// //         <div style={{ textAlign: 'center', marginTop: '50px' }}>
// //             <h2>Settings</h2>
// //             <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <label>Update Password:</label>
// //                     <input
// //                         type="password"
// //                         name="password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         style={{ display: 'block', width: '100%' }}
// //                     />
// //                 </div>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <label>Country:</label>
// //                     <select
// //                         name="country"
// //                         value={formData.country}
// //                         onChange={handleChange}
// //                         style={{ display: 'block', width: '100%' }}
// //                     >
// //                         <option value="">Select your country</option>
// //                         {countries.map((country) => (
// //                             <option key={country.code} value={country.code}>
// //                                 {country.name}
// //                             </option>
// //                         ))}
// //                     </select>
// //                 </div>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <label>Time Zone:</label>
// //                     <select
// //                         name="timeZone"
// //                         value={formData.timeZone}
// //                         onChange={handleChange}
// //                         style={{ display: 'block', width: '100%' }}
// //                     >
// //                         <option value="">Select your time zone</option>
// //                         <option value="America/New_York">America/New_York</option>
// //                         <option value="America/Toronto">America/Toronto</option>
// //                     </select>
// //                 </div>
// //                 <button type="submit" style={{ padding: '10px 20px' }}>Save Changes</button>
// //             </form>
// //             {message && <p>{message}</p>}
// //             <button
// //                 onClick={fetchHolidays}
// //                 style={{ padding: '10px 20px', marginTop: '20px' }}
// //                 disabled={!formData.country}
// //             >
// //                 Fetch Holidays
// //             </button>
// //         </div>
// //     );
// // };

// // export default Settings;
// //***************************** */

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const Settings = ({ user }) => {
// //     const [formData, setFormData] = useState({
// //         password: '',
// //         country: user?.country || '',
// //         timeZone: user?.timeZone || '',
// //     });

// //     const [holidays, setHolidays] = useState([]);
// //     const [message, setMessage] = useState('');
// //     const [countries, setCountries] = useState([]);

// //     // Fetch country list
// //     useEffect(() => {
// //         const fetchCountries = async () => {
// //             try {
// //                 const res = await axios.get('/api/holidays/countries');
// //                 setCountries(res.data);
// //             } catch (err) {
// //                 console.error('Error fetching countries:', err.message);
// //                 setMessage('Error fetching country list.');
// //             }
// //         };
// //         fetchCountries();
// //     }, []);


// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData({ ...formData, [name]: value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const token = localStorage.getItem('token');
// //             const res = await axios.put('/api/auth/settings', formData, {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             setMessage(res.data.message);
// //         } catch (err) {
// //             setMessage('Error updating settings. Please try again.');
// //         }
// //     };


// //     const fetchHolidays = async () => {
// //         try {
// //             const year = new Date().getFullYear();

// //             if (!formData.country) {
// //                 setMessage('Please select a country to fetch holidays.');
// //                 return;
// //             }

// //             const res = await axios.get('/api/holidays', {
// //                 params: { country: formData.country, year },
// //             });
// //             console.log('Holidays:', res.data); // Display holidays
// //             setMessage('Holidays fetched successfully!');
// //         } catch (err) {
// //             console.error('Error fetching holidays:', err.message);
// //             setMessage('Error fetching holidays. Please try again.');
// //         }
// //     };
// //     // const fetchHolidays = async () => {
// //     //     try {
// //     //         const year = new Date().getFullYear();
// //     //         const res = await axios.get(`/api/holidays`, {
// //     //             params: { country: formData.country, year },
// //     //         });
// //     //         setHolidays(res.data.holidays);
// //     //     } catch (err) {
// //     //         console.error('Error fetching holidays:', err.message);
// //     //         setMessage('Error fetching holidays. Please try again.');
// //     //     }
// //     // };


// //     if (!user) {
// //         return <p>Please log in to update your settings.</p>;
// //     }

// //     return (
// //         <div style={{ textAlign: 'center', marginTop: '50px' }}>
// //             <h2>Settings</h2>
// //             <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'inline-block' }}>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <label>Update Password:</label>
// //                     <input
// //                         type="password"
// //                         name="password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         style={{ display: 'block', width: '100%' }}
// //                     />
// //                 </div>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <label>Country:</label>
// //                     <select
// //                         name="country"
// //                         value={formData.country}
// //                         onChange={handleChange}
// //                         style={{ display: 'block', width: '100%' }}
// //                     >
// //                         <option value="">Select your country</option>
// //                         {/* <option value="United States">United States</option>
// //                         <option value="Canada">Canada</option> */}
// //                         {countries.map((country) => (
// //                             <option key={country.code} value={country.code}>
// //                                 {country.name}
// //                             </option>
// //                         ))}
// //                     </select>
// //                 </div>
// //                 <div style={{ marginBottom: '10px' }}>
// //                     <label>Time Zone:</label>
// //                     <select
// //                         name="timeZone"
// //                         value={formData.timeZone}
// //                         onChange={handleChange}
// //                         style={{ display: 'block', width: '100%' }}
// //                     >
// //                         <option value="">Select your time zone</option>
// //                         <option value="America/New_York">America/New_York</option>
// //                         <option value="America/Toronto">America/Toronto</option>
// //                     </select>
// //                 </div>
// //                 <button type="submit" style={{ padding: '10px 20px' }}>Save Changes</button>
// //             </form>
// //             {message && <p>{message}</p>}



// //             <button onClick={fetchHolidays} style={{ padding: '10px 20px', marginTop: '20px' }}>
// //                 Fetch Holidays
// //             </button>
// //             {holidays.length > 0 && (
// //                 <div style={{ marginTop: '20px', textAlign: 'left' }}>
// //                     <h3>Public Holidays:</h3>
// //                     <ul>
// //                         {holidays.map((holiday, index) => (
// //                             <li key={index}>
// //                                 {holiday.name} - {holiday.date}
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>
// //             )}




// //         </div>
// //     );
// // };

// // export default Settings;
