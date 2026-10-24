import { useMutation } from "@tanstack/react-query";
import { createApplication } from "@services/api/api";

export function useCreateApplication() {
    return useMutation({
        mutationFn: createApplication
    })
}