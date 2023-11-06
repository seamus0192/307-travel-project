import styles from './Header.module.css'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className={styles['header']}>
            <Link to={"/home"}>
                <img src= "../../assets/vaction_tracker.jpg" alt="Vacation Tracker logo" width="200" height="200" />
                <header>Vacation Tracker</header>
            </Link>
            <a className={styles['header-button']}>
                References
            </a>
            <Link to='/create-itinerary' className={styles['header-button']}>
                Create Itinerary
            </Link>
            <Link to='/login' className={styles['header-button']}>
                Login/ Sign Up
            </Link>
        </div>
   );
}

export default Header;