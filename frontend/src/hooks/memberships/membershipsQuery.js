import { useQuery } from "@tanstack/react-query";
import { getAllMembershipsOrganization } from '@services/api/api';

export function useApplicationQuery(id) {
    return useQuery({
        queryKey: ['organization-memberships', id],
        queryFn: () => getAllMembershipsOrganization(id),
        enabled: Boolean(id),
    });
}