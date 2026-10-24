import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUser } from '@services/context/UserContext';
import { 
    PROFILE_ROUTE, 
    PROFILE_ORGANIZATIONS_ROUTE,
    LOGIN_ROUTE,
    PROFILE_APPLICATIONS_ROUTE
} from "@utils/router-path";

const ProfileLayout = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(LOGIN_ROUTE);
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
            
            <aside className="w-full h-full md:w-72">
                <div className="card bg-base-100 shadow-md border border-base-200">
                    <div className="card-body p-4">

                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-base-200">
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-lg truncate">{user?.fullName}</h3>
                                <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                            </div>
                        </div>

                        <ul className="menu menu-vertical p-0 w-full gap-1">
                            <li>
                                <NavLink 
                                    to={PROFILE_ROUTE} 
                                    end
                                    className={({ isActive }) => isActive ? "active font-semibold" : ""}
                                >
                                    Мой профиль
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={PROFILE_ORGANIZATIONS_ROUTE}
                                    className={({ isActive }) => isActive ? "active font-semibold" : ""}
                                >
                                    Мои организации
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to={PROFILE_APPLICATIONS_ROUTE}
                                    className={({ isActive }) => isActive ? "active font-semibold" : ""}
                                >
                                    Мои заявки
                                </NavLink>
                            </li>
                        </ul>

                        <div className="divider my-2"></div>

                        <button 
                            onClick={handleLogout}
                            className="btn btn-active btn-warning justify-center hover:bg-error/10"
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 w-full bg-base-100 rounded-box shadow-sm border border-base-200 p-6 min-h-[500px]">
                <Outlet />
            </main>
        </div>
    );
};

export default ProfileLayout;