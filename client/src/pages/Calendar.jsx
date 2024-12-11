//verion 1
import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = ({ userCountry }) => {
    const [selectedCountry, setSelectedCountry] = useState(userCountry || "");
    const [activeDate, setActiveDate] = useState(new Date()); // Sync calendar navigation
    const [countries, setCountries] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [markedDates, setMarkedDates] = useState(new Set());
    const [message, setMessage] = useState("");

    // Fetch the list of countries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("/holidays/countries");
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching country list:", error.message);
                setMessage("Error fetching country list. Please try again.");
            }
        };

        fetchCountries();
    }, []);

    // Fetch holidays based on activeDate (year) and selectedCountry
    useEffect(() => {
        const fetchHolidays = async () => {
            if (!selectedCountry) {
                setMessage("Please select a country to fetch holidays.");
                return;
            }

            // const year = activeDate.getFullYear();
            const year = activeDate.getFullYear();
            setMessage(`Fetching holidays for ${selectedCountry} in ${year}`);
            try {
                const response = await axios.get("/holidays", {
                    params: { country: selectedCountry, year },
                });
                console.log("API Response: ", response.data);

                const holidaysList = response.data;
                setHolidays(holidaysList);

                // Extract holiday dates and store in a Set
                const dates = new Set(
                    holidaysList.map((holiday) => holiday.date.iso)
                );
                setMarkedDates(dates);
                setMessage("");
            } catch (error) {
                console.error("Error fetching holidays:", error.message);
                setMessage("Error fetching holidays. Please try again.");
            }
        };

        fetchHolidays();
    }, [selectedCountry, activeDate]);

    // Handle dropdown year selection
    const handleYearChange = (year) => {
        setActiveDate(new Date(year, activeDate.getMonth(), 1));
    };

    // Render a custom tile to show holidays
    const tileContent = ({ date, view }) => {
        if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            if (markedDates.has(dateString)) {
                const holiday = holidays.find((h) => h.date.iso === dateString);
                return <span style={{ backgroundColor: "yellow" }}>{holiday.name}</span>;
            }
        }
        return null;
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Holiday Calendar</h2>
            <div style={{ marginBottom: "20px" }}>
                {message && <p>{message}</p>}
                <label htmlFor="country-select" style={{ marginRight: "10px" }}>
                    Select Country:
                </label>
                <select
                    id="country-select"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    style={{ padding: "5px", marginRight: "20px" }}
                >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="year-select" style={{ marginRight: "10px" }}>
                    Select Year:
                </label>
                <select
                    id="year-select"
                    value={activeDate.getFullYear()}
                    onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
                    style={{ padding: "5px" }}
                >
                    {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 25 + i).map(
                        (year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        )
                    )}
                </select>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                <Calendar
                    activeStartDate={activeDate}
                    onActiveStartDateChange={({ activeStartDate }) => setActiveDate(activeStartDate)}
                    tileContent={tileContent}
                />
            </div>
        </div>
    );
};

export default Calendar;








//version 2
// import React, { useState, useEffect } from "react";
// import axios from "../utils/axiosInstance";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const CalendarView = ({ userCountry }) => {
//     const [selectedCountry, setSelectedCountry] = useState(userCountry || "");
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [activeStartDate, setActiveStartDate] = useState(new Date(selectedYear, 0, 1));
//     const [countries, setCountries] = useState([]);
//     const [holidays, setHolidays] = useState([]);
//     const [markedDates, setMarkedDates] = useState(new Set());
//     const [message, setMessage] = useState("");

//     // Fetch the list of countries
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const response = await axios.get("/holidays/countries");
//                 setCountries(response.data);
//             } catch (error) {
//                 console.error("Error fetching country list:", error.message);
//                 setMessage("Error fetching country list. Please try again.");
//             }
//         };

//         fetchCountries();
//     }, []);

//     // Fetch holidays
//     useEffect(() => {
//         const fetchHolidays = async () => {
//             if (!selectedCountry) {
//                 setMessage("Please select a country to fetch holidays.");
//                 return;
//             }

//             setMessage(`Fetching holidays for ${selectedCountry} in ${selectedYear}`);
//             try {
//                 const response = await axios.get("/holidays", {
//                     params: { country: selectedCountry, year: selectedYear },
//                 });
//                 console.log("API Response: ", response.data);

//                 const holidaysList = response.data;
//                 setHolidays(holidaysList);

//                 // Extract holiday dates and store in a Set
//                 const dates = new Set(
//                     holidaysList.map((holiday) => holiday.date.iso)
//                 );
//                 setMarkedDates(dates);
//                 setMessage("");
//             } catch (error) {
//                 console.error("Error fetching holidays:", error.message);
//                 setMessage("Error fetching holidays. Please try again.");
//             }
//         };

//         fetchHolidays();
//     }, [selectedCountry, selectedYear]);

//     // Handle calendar navigation
//     const handleActiveStartDateChange = ({ activeStartDate }) => {
//         const newYear = activeStartDate.getFullYear();
//         setActiveStartDate(activeStartDate);
//         setSelectedYear(newYear); // Update the selected year when navigating
//     };

//     // Render a custom tile to show holidays
//     const tileContent = ({ date, view }) => {
//         if (view === "month") {
//             const dateString = date.toISOString().split("T")[0];
//             if (markedDates.has(dateString)) {
//                 const holiday = holidays.find((h) => h.date.iso === dateString);
//                 return (
//                     <span style={{ backgroundColor: "yellow", padding: "2px", borderRadius: "50%" }}>
//                         {holiday.name}
//                     </span>
//                 );
//             }
//         }
//         return null;
//     };

//     return (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Holiday Calendar</h2>
//             <div style={{ marginBottom: "20px" }}>
//                 {message && <p>{message}</p>}
//                 <label htmlFor="country-select" style={{ marginRight: "10px" }}>
//                     Select Country:
//                 </label>
//                 <select
//                     id="country-select"
//                     value={selectedCountry}
//                     onChange={(e) => setSelectedCountry(e.target.value)}
//                     style={{ padding: "5px", marginRight: "20px" }}
//                 >
//                     <option value="">Select your country</option>
//                     {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: "20px",
//                 }}
//             >
//                 <Calendar
//                     tileContent={tileContent}
//                     onActiveStartDateChange={handleActiveStartDateChange}
//                     activeStartDate={activeStartDate}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CalendarView;

//************* */

// import React, { useState, useEffect } from "react";
// import axios from "../utils/axiosInstance";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const CalendarView = ({ userCountry }) => {
//     const [selectedCountry, setSelectedCountry] = useState(userCountry || "");
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const [countries, setCountries] = useState([]);
//     const [holidays, setHolidays] = useState([]);
//     const [markedDates, setMarkedDates] = useState(new Set());
//     const [message, setMessage] = useState("");

//     // Fetch the list of countries
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const response = await axios.get("/holidays/countries");
//                 setCountries(response.data);
//             } catch (error) {
//                 console.error("Error fetching country list:", error.message);
//                 setMessage("Error fetching country list. Please try again.");
//             }
//         };

//         fetchCountries();
//     }, []);

//     // Fetch holidays
//     useEffect(() => {
//         const fetchHolidays = async () => {
//             if (!selectedCountry) {
//                 setMessage("Please select a country to fetch holidays.");
//                 return;
//             }

//             setMessage(`Fetching holidays for ${selectedCountry} in ${selectedYear}`);
//             try {
//                 const response = await axios.get("/holidays", {
//                     params: { country: selectedCountry, year: selectedYear },
//                 });
//                 console.log("API Response: ", response.data);

//                 const holidaysList = response.data;
//                 setHolidays(holidaysList);

//                 // Extract holiday dates and store in a Set
//                 const dates = new Set(
//                     holidaysList.map((holiday) => holiday.date.iso)
//                 );
//                 setMarkedDates(dates);
//                 setMessage("");
//             } catch (error) {
//                 console.error("Error fetching holidays:", error.message);
//                 setMessage("Error fetching holidays. Please try again.");
//             }
//         };

//         fetchHolidays();
//     }, [selectedCountry, selectedYear]);

//     // Render a custom tile to show holidays
//     const tileContent = ({ date, view }) => {
//         if (view === "month") {
//             const dateString = date.toISOString().split("T")[0];
//             if (markedDates.has(dateString)) {
//                 const holiday = holidays.find((h) => h.date.iso === dateString);
//                 return <span style={{ backgroundColor: "yellow" }}>{holiday.name}</span>;
//             }
//         }
//         return null;
//     };

//     return (
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Holiday Calendar</h2>
//             <div style={{ marginBottom: "20px" }}>
//                 {message && <p>{message}</p>}
//                 <label htmlFor="country-select" style={{ marginRight: "10px" }}>
//                     Select Country:
//                 </label>
//                 <select
//                     id="country-select"
//                     value={selectedCountry}
//                     onChange={(e) => setSelectedCountry(e.target.value)}
//                     style={{ padding: "5px", marginRight: "20px" }}
//                 >
//                     <option value="">Select your country</option>
//                     {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//                 <label htmlFor="year-select" style={{ marginRight: "10px" }}>
//                     Select Year:
//                 </label>
//                 <select
//                     id="year-select"
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
//                     style={{ padding: "5px" }}
//                 >
//                     {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 25 + i).map(
//                         (year) => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         )
//                     )}
//                 </select>
//             </div>
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: "20px",
//                 }}
//             >
//                 <Calendar tileContent={tileContent} />
//             </div>
//         </div>
//     );
// };

// export default CalendarView;




//it still work for settings page calendar but not calendar view's
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from '../utils/axiosInstance'; // Ensure axios baseURL configuration is correct

// const CalendarView = ({ user }) => {
//     const [holidays, setHolidays] = useState([]);
//     const [highlightedDates, setHighlightedDates] = useState({});
//     const [message, setMessage] = useState('');
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState(user?.country || '');

//     // Fetch country list on component mount
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axios.get('/holidays/countries');
//                 setCountries(res.data);
//             } catch (err) {
//                 console.error('Error fetching countries:', err.message);
//                 setMessage('Error fetching country list.');
//             }
//         };

//         fetchCountries();
//     }, []);

//     // Fetch holidays whenever the selected country changes
//     useEffect(() => {
//         const fetchHolidays = async () => {
//             if (!selectedCountry) {
//                 setMessage('Please select a country to fetch holidays.');
//                 return;
//             }

//             try {
//                 const year = new Date().getFullYear();
//                 const res = await axios.get('/holidays', {
//                     params: { country: selectedCountry, year },
//                 });

//                 setHolidays(res.data.holidays);

//                 // Map holidays into a key-value pair for easier lookup
//                 const datesWithNames = {};
//                 res.data.holidays.forEach((holiday) => {
//                     datesWithNames[holiday.date.iso] = holiday.name;
//                 });
//                 setHighlightedDates(datesWithNames);

//                 setMessage('');
//             } catch (err) {
//                 console.error('Error fetching holidays:', err.message);
//                 setMessage('Error fetching holidays. Please try again.');
//             }
//         };

//         fetchHolidays();
//     }, [selectedCountry]);

//     // Render holiday names on the calendar tiles
//     const tileContent = ({ date, view }) => {
//         if (view === 'month') {
//             const formattedDate = date.toISOString().split('T')[0];
//             if (highlightedDates[formattedDate]) {
//                 return (
//                     <div
//                         style={{
//                             backgroundColor: 'lightblue',
//                             borderRadius: '5px',
//                             padding: '2px',
//                             fontSize: '0.8em',
//                             textAlign: 'center',
//                         }}
//                     >
//                         {highlightedDates[formattedDate]}
//                     </div>
//                 );
//             }
//         }
//         return null;
//     };

//     // Handle country selection
//     const handleCountryChange = (e) => {
//         setSelectedCountry(e.target.value);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <h2>Holiday Calendar</h2>
//             {message && <p style={{ color: 'red' }}>{message}</p>}

//             <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="country-select" style={{ marginRight: '10px' }}>Select Country:</label>
//                 <select
//                     id="country-select"
//                     value={selectedCountry}
//                     onChange={handleCountryChange}
//                     style={{ padding: '5px', width: '200px' }}
//                 >
//                     <option value="">-- Select a Country --</option>
//                     {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <Calendar
//                 tileContent={tileContent}
//                 style={{ margin: '0 auto' }}
//             />
//         </div>
//     );
// };

// export default CalendarView;



// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from '../utils/axiosInstance'; // Ensure axios baseURL configuration is correct

// const CalendarView = ({ user }) => {
//     const [holidays, setHolidays] = useState([]);
//     const [highlightedDates, setHighlightedDates] = useState({});
//     const [message, setMessage] = useState('');
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState(user?.country || '');

//     // Fetch country list on component mount
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axios.get('/holidays/countries');
//                 setCountries(res.data);
//             } catch (err) {
//                 console.error('Error fetching countries:', err.message);
//                 setMessage('Error fetching country list.');
//             }
//         };

//         fetchCountries();
//     }, []);

//     // Fetch holidays whenever the selected country changes
//     useEffect(() => {
//         const fetchHolidays = async () => {
//             if (!selectedCountry) {
//                 setMessage('Please select a country to fetch holidays.');
//                 return;
//             }

//             try {
//                 const year = new Date().getFullYear();
//                 const res = await axios.get('/holidays', {
//                     params: { country: selectedCountry, year },
//                 });

//                 setHolidays(res.data.holidays);

//                 // Map holidays into a key-value pair for easier lookup
//                 const datesWithNames = {};
//                 res.data.holidays.forEach((holiday) => {
//                     datesWithNames[holiday.date.iso] = holiday.name;
//                 });
//                 setHighlightedDates(datesWithNames);

//                 setMessage('');
//             } catch (err) {
//                 console.error('Error fetching holidays:', err.message);
//                 setMessage('Error fetching holidays. Please try again.');
//             }
//         };

//         fetchHolidays();
//     }, [selectedCountry]);

//     // Render holiday names on the calendar tiles
//     const tileContent = ({ date, view }) => {
//         if (view === 'month') {
//             const formattedDate = date.toISOString().split('T')[0];
//             if (highlightedDates[formattedDate]) {
//                 return (
//                     <div
//                         style={{
//                             backgroundColor: 'lightblue',
//                             borderRadius: '5px',
//                             padding: '2px',
//                             fontSize: '0.8em',
//                             textAlign: 'center',
//                         }}
//                     >
//                         {highlightedDates[formattedDate]}
//                     </div>
//                 );
//             }
//         }
//         return null;
//     };

//     // Handle country selection
//     const handleCountryChange = (e) => {
//         setSelectedCountry(e.target.value);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <h2>Holiday Calendar</h2>
//             {message && <p style={{ color: 'red' }}>{message}</p>}

//             <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="country-select" style={{ marginRight: '10px' }}>Select Country:</label>
//                 <select
//                     id="country-select"
//                     value={selectedCountry}
//                     onChange={handleCountryChange}
//                     style={{ padding: '5px', width: '200px' }}
//                 >
//                     <option value="">-- Select a Country --</option>
//                     {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <Calendar
//                 tileContent={tileContent}
//                 style={{ margin: '0 auto' }}
//             />
//         </div>
//     );
// };

// export default CalendarView;



// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from '../utils/axiosInstance'; // Ensure axios baseURL configuration is correct

// const CalendarView = ({ user }) => {
//     const [holidays, setHolidays] = useState([]);
//     const [highlightedDates, setHighlightedDates] = useState({});
//     const [message, setMessage] = useState('');
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState(user?.country || '');

//     // Fetch country list on component mount
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axios.get('/holidays/countries');
//                 setCountries(res.data);
//             } catch (err) {
//                 console.error('Error fetching countries:', err.message);
//                 setMessage('Error fetching country list.');
//             }
//         };

//         fetchCountries();
//     }, []);

//     // Fetch holidays whenever the selected country changes
//     useEffect(() => {
//         const fetchHolidays = async () => {
//             if (!selectedCountry) {
//                 setMessage('Please select a country to fetch holidays.');
//                 return;
//             }

//             try {
//                 const year = new Date().getFullYear();
//                 const res = await axios.get('/holidays', {
//                     params: { country: selectedCountry, year },
//                 });

//                 setHolidays(res.data.holidays);

//                 // Map holidays into a key-value pair for easier lookup
//                 const datesWithNames = {};
//                 res.data.holidays.forEach((holiday) => {
//                     datesWithNames[holiday.date.iso] = holiday.name;
//                 });
//                 setHighlightedDates(datesWithNames);

//                 setMessage('');
//             } catch (err) {
//                 console.error('Error fetching holidays:', err.message);
//                 setMessage('Error fetching holidays. Please try again.');
//             }
//         };

//         fetchHolidays();
//     }, [selectedCountry]);

//     // Render holiday names on the calendar tiles
//     const tileContent = ({ date, view }) => {
//         if (view === 'month') {
//             const formattedDate = date.toISOString().split('T')[0];
//             if (highlightedDates[formattedDate]) {
//                 return (
//                     <div
//                         style={{
//                             backgroundColor: 'lightblue',
//                             borderRadius: '5px',
//                             padding: '2px',
//                             fontSize: '0.8em',
//                             textAlign: 'center',
//                         }}
//                     >
//                         {highlightedDates[formattedDate]}
//                     </div>
//                 );
//             }
//         }
//         return null;
//     };

//     // Handle country selection
//     const handleCountryChange = (e) => {
//         setSelectedCountry(e.target.value);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <h2>Holiday Calendar</h2>
//             {message && <p style={{ color: 'red' }}>{message}</p>}

//             <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="country-select" style={{ marginRight: '10px' }}>Select Country:</label>
//                 <select
//                     id="country-select"
//                     value={selectedCountry}
//                     onChange={handleCountryChange}
//                     style={{ padding: '5px', width: '200px' }}
//                 >
//                     <option value="">-- Select a Country --</option>
//                     {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <Calendar
//                 tileContent={tileContent}
//                 style={{ margin: '0 auto' }}
//             />
//         </div>
//     );
// };

// export default CalendarView;
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from '../utils/axiosInstance'; // Ensure axios baseURL configuration is correct

// const CalendarView = ({ user }) => {
//     const [holidays, setHolidays] = useState([]);
//     const [highlightedDates, setHighlightedDates] = useState({});
//     const [message, setMessage] = useState('');
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState(user?.country || '');

//     // Fetch country list on component mount
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axios.get('/holidays/countries');
//                 setCountries(res.data);
//             } catch (err) {
//                 console.error('Error fetching countries:', err.message);
//                 setMessage('Error fetching country list.');
//             }
//         };

//         fetchCountries();
//     }, []);

//     // Fetch holidays whenever the selected country changes
//     useEffect(() => {
//         const fetchHolidays = async () => {
//             if (!selectedCountry) {
//                 setMessage('Please select a country to fetch holidays.');
//                 return;
//             }

//             try {
//                 const year = new Date().getFullYear();
//                 const res = await axios.get('/holidays', {
//                     params: { country: selectedCountry, year },
//                 });

//                 setHolidays(res.data.holidays);

//                 // Map holidays into a key-value pair for easier lookup
//                 const datesWithNames = {};
//                 res.data.holidays.forEach((holiday) => {
//                     datesWithNames[holiday.date.iso] = holiday.name;
//                 });
//                 setHighlightedDates(datesWithNames);

//                 setMessage('');
//             } catch (err) {
//                 console.error('Error fetching holidays:', err.message);
//                 setMessage('Error fetching holidays. Please try again.');
//             }
//         };

//         fetchHolidays();
//     }, [selectedCountry]);

//     // Render holiday names on the calendar tiles
//     const tileContent = ({ date, view }) => {
//         if (view === 'month') {
//             const formattedDate = date.toISOString().split('T')[0];
//             if (highlightedDates[formattedDate]) {
//                 return (
//                     <div
//                         style={{
//                             backgroundColor: 'lightblue',
//                             borderRadius: '5px',
//                             padding: '2px',
//                             fontSize: '0.8em',
//                             textAlign: 'center',
//                         }}
//                     >
//                         {highlightedDates[formattedDate]}
//                     </div>
//                 );
//             }
//         }
//         return null;
//     };

//     // Handle country selection
//     const handleCountryChange = (e) => {
//         setSelectedCountry(e.target.value);
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <h2>Holiday Calendar</h2>
//             {message && <p style={{ color: 'red' }}>{message}</p>}

//             <div style={{ marginBottom: '20px' }}>
//                 <label htmlFor="country-select" style={{ marginRight: '10px' }}>Select Country:</label>
//                 <select
//                     id="country-select"
//                     value={selectedCountry}
//                     onChange={handleCountryChange}
//                     style={{ padding: '5px', width: '200px' }}
//                 >
//                     <option value="">-- Select a Country --</option>
//                     {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                             {country.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <Calendar
//                 tileContent={tileContent}
//                 style={{ margin: '0 auto' }}
//             />
//         </div>
//     );
// };

// export default CalendarView;





// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import axios from 'axios';

// const CalendarView = ({ user }) => {
//   const [date, setDate] = useState(new Date());
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch holidays data when the component mounts or when the user changes country
//   useEffect(() => {
//     const fetchHolidays = async () => {
//       if (!user?.country) return;

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
//           params: {
//             api_key: 'lqlmFislNqTj234diKbVnsD0QB8WZgq4',
//             country: user.country,
//             year: new Date().getFullYear(),
//           },
//         });

//         // Filter and format holidays to extract the date
//         const holidays = response.data.response.holidays.map(holiday => new Date(holiday.date.iso));
//         setHolidays(holidays);
//       } catch (err) {
//         setError('Failed to load holidays. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHolidays();
//   }, [user?.country]);

//   const handleDateChange = (value) => {
//     setDate(value);
//   };

//   // Highlight the public holidays on the calendar
//   const tileClassName = ({ date }) => {
//     const dateString = date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
//     if (holidays.some(holiday => holiday.toISOString().split('T')[0] === dateString)) {
//       return 'holiday-tile';
//     }
//     return '';
//   };

//   return (
//     <div>
//       <h2>Calendar View</h2>
//       {loading && <p>Loading holidays...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <Calendar 
//         value={date} 
//         onChange={handleDateChange} 
//         tileClassName={tileClassName} 
//       />
//       <div>
//         Selected Date: {date.toDateString()}
//       </div>

//       {/* Display holidays for the selected month */}
//       <div>
//         <h3>Holidays in {user?.country} ({new Date().getFullYear()})</h3>
//         <ul>
//           {holidays.map((holiday, index) => (
//             <li key={index}>{holiday.toDateString()}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CalendarView;

//************** */
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const CalendarView = ({ holidays }) => {
//   const [date, setDate] = useState(new Date());

//   const isHoliday = (date) => {
//     const formattedDate = date.toISOString().split('T')[0];
//     return holidays.includes(formattedDate);
//   };

//   return (
//     <div>
//       <h2>Calendar</h2>
//       <Calendar
//         onChange={setDate}
//         value={date}
//         tileClassName={({ date }) => (isHoliday(date) ? 'holiday' : null)}
//       />
//       <p>Selected Date: {date.toDateString()}</p>
//     </div>
//   );
// };

// export default CalendarView;




// //last one which works (as of 20241209 1418)
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const CalendarView = () => {
//   const [date, setDate] = useState(new Date());

//   const handleDateChange = (value) => {
//     setDate(value);
//   };

//   return (
//     <div>
//       <h2>Calendar View</h2>
//       <Calendar value={date} onChange={handleDateChange} />
//       <div>
//         Selected Date: {date.toDateString()}
//       </div>
//     </div>
//   );
// };

// export default CalendarView;
