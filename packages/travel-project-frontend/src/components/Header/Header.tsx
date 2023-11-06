import styles from './Header.module.css'

function Header() {
    return (
        <div>
            <img src= "../../assets/vaction_tracker.jpg" alt="Vacation Tracker logo" width="200" height="200" />
            <p>Vaction Tracker</p>
            <button
                className={styles['create-button']}
            >
            Create Itinerary
            </button>
            <button
                className={styles['create-button']}
            >
            References
            </button>
        </div>
   );
}