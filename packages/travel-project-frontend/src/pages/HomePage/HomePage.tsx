import styles from './HomePage.module.css'
import React, { useState } from 'react'

function CreateHomePage() {
    const [searchTitle, setSearchTitle] = useState(' ');
    const [searchAuthor, setSearchAuthor] = useState(' ');

    const handleSearchButtonClick = () => {
        console.log('')
    };
    return (
        <div>
            <input
                type="text"
                value={searchTitle}
                placeholder="Enter Title"
                onChange={(e) => setSearchTitle(e.target.value)}
            />
            <input
                type="text"
                value={searchAuthor}
                placeholder="Enter Author"
                onChange={(e) => setSearchAuthor(e.target.value)}
            />
            <button
                onClick={handleSearchButtonClick}
                className={styles['create-button']}
            >
            Search
            </button>
        </div>
        );
}

export default CreateHomePage;