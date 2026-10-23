import { Outlet, useLocation  } from "react-router-dom";
import Header from "@components/Header";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "@utils/router-path";

const Layout = () => {
    const location = useLocation();
    const pathsWithoutHeader = [ LOGIN_ROUTE, REGISTRATION_ROUTE ];

    const shouldHideHeader = pathsWithoutHeader.some(path => 
        location.pathname.startsWith(path)
    );

    return (
        <div className="flex min-h-screen flex-1 flex-col flex-wrap">
            {!shouldHideHeader && <Header />}

            <main className="w-full flex-1 bg-[var(--color-bg)]">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col px-[10px]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;