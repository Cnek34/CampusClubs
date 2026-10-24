import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useOrganizationQuery } from "@hooks/organizations/organizationsQuery";
import { useApplicationQuery } from "@hooks/memberships/membershipsQuery";
import { URL } from '@services/api/index';
import { useUser } from '@services/context/UserContext';
import { APPLICATION_FORM_ROUTE, LOGIN_ROUTE } from "@utils/router-path"
import { useMemo } from 'react';

const ROLE_NAMES = {
  leader: 'Руководитель',
  moderator: 'Модератор',
  event_manager: 'Менеджер мероприятий',
  member: 'Член организации',
};

const ROLE_WEIGHT = {
  leader: 1,
  moderator: 2,
  event_manager: 3,
  member: 4, 
};

const Organization = () => {
  const { isAuth, user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: organization } = useOrganizationQuery(id);
  const { data: membershipsData, isLoading: isMembershipsLoading } = useApplicationQuery(id);

  const memberships = useMemo(() => {
    if (!membershipsData) return [];

    const mgmtRoles = ['leader', 'moderator', 'event_manager'];

    return membershipsData
      .filter((m) => mgmtRoles.includes(m.role))
      .sort((a, b) => {
        const weightA = ROLE_WEIGHT[a.role] ?? 99;
        const weightB = ROLE_WEIGHT[b.role] ?? 99;
        if (weightA !== weightB) return weightA - weightB;
        return a.user.full_name.localeCompare(b.user.full_name);
      });
  }, [membershipsData]);

  const isMember = useMemo(() => {
    if (!user?.id || !membershipsData) return false;
    return membershipsData.some(
      (m) => (m.user?.id ?? m.user_id) === user.id
    );
  }, [membershipsData, user?.id]);

  const handleOpenClick = (id) => {
      if (isAuth) {
        console.log(`${APPLICATION_FORM_ROUTE}/${id}`)
        console.log(location)
        navigate(`${APPLICATION_FORM_ROUTE}/${id}`, {
          state: {
              background: location,
          },
        });
      } else {
        navigate(LOGIN_ROUTE)
      }
    };

  if (!organization) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      <div className="card w-full bg-base-100 shadow-md overflow-hidden">
        <figure className="w-full h-48 sm:h-64 md:h-80">
          <img
            src={`${URL}/${organization.cover_img}`}
            alt={organization.name}
            className="h-full w-full object-cover"
          />
        </figure>
        
        <div className="card-body p-5 sm:p-8">
          
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-2">
            <div>
              <h2 className="card-title text-2xl sm:text-3xl font-bold">{organization.name}</h2>
                <div className="badge badge-primary badge-outline mt-2 h-auto py-1 px-3 whitespace-normal text-center leading-tight text-xs sm:text-sm">
                    {organization.category}
                </div>
            </div>
            
            <button className={`btn btn-primary w-full md:w-auto ${isMember && "btn-disabled"}`} onClick={() => handleOpenClick(organization.id)}>
              Подать заявку
            </button>
          </div>

          <p className="mt-4 text-base-content/80 text-sm sm:text-base leading-relaxed">
            {organization.description}
          </p>
          
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-base-content/60">
            {organization.email && <span>{organization.email}</span>}
            {organization.phone && <span>{organization.phone}</span>}
          </div>

          <div className="divider my-6 sm:my-8">Руководство</div>

          {isMembershipsLoading ? (
            <div className="flex justify-center py-4">
              <span className="loading loading-ring loading-lg text-primary"></span>
            </div>
          ) : memberships?.length ? (
            <ul className="list bg-base-200 rounded-box">
              {memberships.map((m) => (
                <li 
                  key={m.id} 
                  className="list-row flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4 p-4"
                >
              
                  <div>
                    <div className="font-bold text-base sm:text-lg">{m.user.full_name}</div>
                    <div className="text-sm font-medium text-primary">{ROLE_NAMES[m.role] || m.role}</div>
                  </div>
                  
                  <div className="flex flex-col text-sm text-base-content/70 sm:items-end gap-1">
                    {m.user.email && (
                      <a href={`mailto:${m.user.email}`} className="link link-hover hover:text-primary transition-colors break-all">
                        {m.user.email}
                      </a>
                    )}
                    {m.user.phone && (
                      <a href={`tel:${m.user.phone.replace(/[^\d+]/g, '')}`} className="link link-hover hover:text-primary transition-colors">
                        {m.user.phone}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-base-content/60 text-center py-4">Пока нет руководителей</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Organization;