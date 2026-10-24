import { useQuery } from "@tanstack/react-query";
import { getAllOrganization, getOneOrganization } from '@services/api/api';

export function useOrganizationsQuery() {
    return useQuery({
        queryKey: ['organizations'],
        queryFn: () => getAllOrganization(),
    });
}

export function useOrganizationQuery(id) {
    return useQuery({
        queryKey: ['organization', id],
        queryFn: () => getOneOrganization(id)
    });
}