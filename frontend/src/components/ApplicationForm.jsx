import { useState } from 'react';
import { useUser } from '@services/context/UserContext';
import { useParams } from 'react-router-dom';
import { useCreateApplication } from '@hooks/applications/applicationsMutations';
import toast from 'react-hot-toast';

const ApplicationForm = ({onClose}) => {
    const { user } = useUser();
    const { id: organizationId } = useParams();
    const [ resume, setResume ] = useState('');
    const [ motivation, setMotivation ] = useState('');

    const createApplication = useCreateApplication();

    const onHandleCreateApplication = (e) => {
        e.preventDefault();
        try {
            createApplication.mutate({ 
                userId: user.id,
                organizationId: Number(organizationId),
                resumeUrl: resume,
                motivation: motivation 
            });
            toast.success('Анкета отправлена на рассмотрение');
            onClose();
        } catch (e) {
            toast.error(
                err?.response?.data?.message || 'Не удалось отправить анкету'
            );
        }
    }

    return (
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
            <div className="card-body">
                <h2 className="text-2xl font-bold mb-1 mx-auto">Анкета</h2>
                <fieldset className="fieldset">
                    <label className="label">Ссылка на резюме</label>
                    <input 
                        type="url" 
                        className="input w-full" 
                        placeholder="Ссылка"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                    />

                    <label className="label">Почему вы хотите вступить?</label>
                    <textarea 
                        className="textarea textarea-md w-full"
                        value={motivation} 
                        onChange={(e) => setMotivation(e.target.value)}
                    />

                    <button className="btn btn-neutral mt-4" onClick={onHandleCreateApplication}>Отправить</button>
                </fieldset>
            </div>
        </div>
    );
};

export default ApplicationForm;