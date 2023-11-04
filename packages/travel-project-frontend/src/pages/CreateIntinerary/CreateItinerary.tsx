import styles from './CreateItinerary.module.css'
import React, { useState } from 'react';

function CreateItinerary() {
    const [itenTitle, setItenTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [numTravelers, setNumTravelers] = useState('');

    const handleCreateButtonClick = () => {
        console.log('Name:', itenTitle);
    };

    return (
        <div>
            <input
                type="text"
                value={itenTitle}
                placeholder="Itinerary Title"
                onChange={(e) => setItenTitle(e.target.value)} // Update 'title' directly
                className={styles['iten-title']}
            />
            <input
                type="text"
                value={location}
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)} // Update 'name' directly
                className={styles['iten-location']}
            />
            <input
                type="text"
                placeholder="Start Date (DD/MM/YYYY)"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} // Update 'name' directly
                className={styles['iten-start-date']}
            />
            <input
                type="text"
                placeholder="End Date (DD/MM/YYYY)"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} // Update 'name' directly
                className={styles['iten-end-date']}
            />
            <input
                type="text"
                placeholder="# of Travelers"
                value={numTravelers}
                onChange={(e) => setNumTravelers(e.target.value)} // Update 'name' directly
                className={styles['item-num-travelers']}
            />
            <button
                onClick={handleCreateButtonClick}
                className={styles['create-button']}
            >
                Create!
            </button>
        </div>
    );
}

export default CreateItinerary;