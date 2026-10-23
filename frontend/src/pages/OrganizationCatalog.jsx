import Card from "@components/Card";
import { ORGANIZATION_ROUTE } from "@utils/router-path";
import { useQuery } from "@tanstack/react-query";
import { getAllOrganization } from '@services/api/api';

const OrganizationCatalog = () => {
    const { data: organizations, isLoading } = useQuery({
        queryKey: ['organizations'],
        queryFn: () => getAllOrganization(),
    });

    return (
        <div className="mt-8 flex flex-col gap-4">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                Каталог организаций
            </h1>

            {isLoading ? (
                <div className="flex min-h-[60vh] items-center justify-center">
                    <span className="loading loading-spinner loading-xl h-10 w-10" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {organizations?.map((organization) => (
                        <Card
                            key={organization.id}
                            organization={organization}
                            to={`${ORGANIZATION_ROUTE}/${organization.id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrganizationCatalog;