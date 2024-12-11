import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';

const EventList = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axiosInstance.get('/events', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching events:', err.message);
                setMessage('Error fetching events. Please try again.');
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.delete(`/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(events.filter((event) => event._id !== id));
            setMessage('Event deleted successfully');
        } catch (err) {
            console.error('Error deleting event:', err.message);
            setMessage('Error deleting event. Please try again.');
        }
    };

 const handleEdit = (id) => {
    navigate(`/events/edit/${id}`);
};


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Your Events</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event._id} style={{ marginBottom: '10px' }}>
                            <strong>{event.name}</strong> - {new Date(event.startDate).toLocaleDateString()}
                            <button onClick={() => handleDelete(event._id)} style={{ marginLeft: '10px' }}>
                                Delete
                            </button>
                            <button onClick={() => handleEdit(event._id)} style={{ marginLeft: '10px' }}>
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events found</p>
            )}
        </div>
    );
};

export default EventList;
