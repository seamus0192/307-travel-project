import styles from './Header.module.css'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div>
            <Link to={"/home"}>
                <img src= "../../assets/vaction_tracker.jpg" alt="Vacation Tracker logo" width="200" height="200" />
                <p>Vacation Tracker</p>
            </Link>
            <Link to='/create-itinerary'>
                <button className={styles['create-button']}>
                    Create Itinerary
                </button>
            </Link>
            <button className={styles['create-button']}>
                References
            </button>
        </div>
   );
}

export default Header;