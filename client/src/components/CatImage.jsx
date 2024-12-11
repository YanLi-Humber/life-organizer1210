import React, { useEffect, useState } from 'react';

const CatImage = () => {
    const [catImage, setCatImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCatImage = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            setCatImage(data[0].url);
        } catch (err) {
            setError('Failed to fetch cat image');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatImage();
    }, []);

    return (
        <div>
            {loading && <p>Loading cat image...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {catImage && (
                <img
                    src={catImage}
                    alt="Random Cat"
                    style={{ height: '200px', width: 'auto' }} 
                />
            )}
            <button onClick={fetchCatImage}>Fetch New Cat</button>
        </div>
    );
};

export default CatImage;
