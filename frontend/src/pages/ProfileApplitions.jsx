import { useUser } from "@services/context/UserContext";
import { useApplicationQuery } from '@hooks/applications/applicationsQuery';

const STATUS_NAMES = {
  consideration: 'На рассмотрение',
  interview: 'Интервью',
  approve: 'Одобренно',
  rejection: 'Отказ',
};

const ProfileApplitions = () => {
    const { user } = useUser();
    const { data: applications } = useApplicationQuery(user.id);

    if (!applications || applications.length === 0) {
        return <div className="text-base-content/60 p-4 text-center">Вы не подавали ни одной заявки</div>;
    }

    return (
        <div className="space-y-2">
            {applications?.map((application) => (
                <details 
                    key={application.id}
                    className="collapse bg-base-100 border border-base-300"
                >
                    <summary className="collapse-title font-semibold">
                        {application.organization?.name || 'Организация'}
                    </summary>
                    <div className="collapse-content text-sm space-y-2">
                        <p><strong>Статус:</strong> {STATUS_NAMES[application.status]}</p>
                        <p><strong>Дата интервью:</strong> {application.interview_at ? new Date(application.interview_at).toLocaleDateString('ru-RU') : 'не назачена'}</p>
                        <p><strong>Дата подачи:</strong> {new Date(application.createdAt).toLocaleDateString('ru-RU')}</p>
                    </div>
                </details>
            ))}
        </div>
    );
};

export default ProfileApplitions;