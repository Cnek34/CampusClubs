import { Routes, Route, Navigate  } from 'react-router-dom';
import { authRoutes, publicRoutes } from "@/routes";
import { ORGANIZATION_CATALOG_ROUTE} from "@utils/router-path";
import Layout from "@components/Layout";
import { useUser } from '@services/context/UserContext'

const AppRouter = () => {
    const { isAuth } = useUser();
    return (
      <Routes>
        <Route element={<Layout />}>
            {isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} exact />
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} exact />
            )}
            <Route path="*" element={<Navigate to={ORGANIZATION_CATALOG_ROUTE} />}/>
        </Route>
      </Routes>
   );
}

export default AppRouter;