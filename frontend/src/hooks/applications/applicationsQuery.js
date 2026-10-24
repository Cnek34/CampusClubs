import { useQuery } from "@tanstack/react-query";
import { getApplicationsUserId } from '@services/api/api';

export function useApplicationQuery(userId) {
    return useQuery({
        queryKey: ['applications', userId],
        queryFn: () => getApplicationsUserId(userId)
    })
}