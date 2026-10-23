import { 
    LOGIN_ROUTE, 
    REGISTRATION_ROUTE,
    ORGANIZATION_ROUTE,
    ORGANIZATION_CATALOG_ROUTE,
    PROFILE_ROUTE
} from "@utils/router-path";
import Auth from "@pages/Auth";
import Organization from "@pages/Organization";
import OrganizationCatalog from "@pages/OrganizationCatalog";
import Profile from "@pages/Profile"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ORGANIZATION_ROUTE + '/:id',
        Component: Organization
    },
    {
        path: ORGANIZATION_CATALOG_ROUTE,
        Component: OrganizationCatalog
    }
];