import { Routes, Route, Navigate, useLocation, useNavigate  } from 'react-router-dom';
import { authRoutes, publicRoutes } from "@/routes";
import { ORGANIZATION_CATALOG_ROUTE, PROFILE_ROUTE, PROFILE_ORGANIZATIONS_ROUTE, PROFILE_APPLICATIONS_ROUTE, APPLICATION_FORM_ROUTE } from "@utils/router-path";
import Layout from "@components/Layout";
import ProfileLayout from "@components/ProfileLayout";
import Profile from "@pages/Profile";
import ProfileOrganization from "@pages/ProfileOrganization";
import ProfileApplitions from "@pages/ProfileApplitions";
import { useUser } from '@services/context/UserContext'
import Modal from "@components/Modal";
import ApplicationForm from "@components/ApplicationForm";

const AppRouter = () => {
    const { isAuth, isAuthLoading  } = useUser();

    const location = useLocation();
    const background = location.state?.background;
    const navigate = useNavigate();

    if (isAuthLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <>
            <Routes location={background || location}>
                <Route element={<Layout />}>
                    {isAuth && (
                        <Route path={PROFILE_ROUTE} element={<ProfileLayout />}>
                            <Route index element={<Profile />} />
                            <Route path={PROFILE_ORGANIZATIONS_ROUTE} element={<ProfileOrganization />} />
                            <Route path={PROFILE_APPLICATIONS_ROUTE} element={<ProfileApplitions />} />
                        </Route>
                    )}

                    {publicRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} element={<Component/>} />
                    )}

                    {isAuth && (
                        <Route 
                            path={`${APPLICATION_FORM_ROUTE}/:id`} 
                            element={
                                <Modal onClose={() => navigate(-1)}>
                                    <ApplicationForm onClose={() => navigate(-1)} />
                                </Modal>
                            }
                        />
                    )}

                    <Route path="*" element={<Navigate to={ORGANIZATION_CATALOG_ROUTE} />}/>
                </Route>
            </Routes>

            {background && (
                <Routes>
                    <Route 
                        path={`${APPLICATION_FORM_ROUTE}/:id`} 
                        element={
                            <Modal onClose={() => navigate(-1)}>
                                <ApplicationForm onClose={() => navigate(-1)} />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
   );
}

export default AppRouter;