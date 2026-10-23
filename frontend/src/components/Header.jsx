import Logo from "@assets/icon/logo.svg?react";
import { Link, NavLink } from "react-router-dom";
import { ORGANIZATION_CATALOG_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE } from "@utils/router-path";
import { useUser } from '@services/context/UserContext';

const Header = () => {
    const { isAuth, isAuthLoading } = useUser();

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li><a>Главная</a></li>
                        <li><NavLink to={ORGANIZATION_CATALOG_ROUTE}>Организации</NavLink></li>
                        <li><a>Мероприятия</a></li>
                    </ul>
                    </div>
                    <Logo className="btn btn-ghost text-xl" />
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Главная</a></li>
                        <li><NavLink to={ORGANIZATION_CATALOG_ROUTE}>Организации</NavLink></li>
                        <li><a>Мероприятия</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {isAuthLoading ? (
                        <button className="btn btn-square">
                            <span className="loading loading-spinner"></span>
                        </button>
                    ): isAuth ? (
                        <Link to={PROFILE_ROUTE} className="btn">Профиль</Link>
                    ) : (
                        <div className="aura aura-rainbow">
                            <Link to={LOGIN_ROUTE} className="btn">Войти</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;