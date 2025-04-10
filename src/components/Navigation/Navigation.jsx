import css from './Navigation.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router';

const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    return (
        <header className={css.header}>
            <nav className={css.nav}>
                <ul className={css.list}>
                    <li>
                        <NavLink to="/" className={getLinkStyles}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies" className={getLinkStyles}>
                            Movies
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
} 