import { Link } from "react-router-dom";
import { URL } from '@services/api/index';

const Card = ({ organization, to }) => {
    const { name, category, email, cover_img, description } = organization;

    const shortDescription =
        description.length > 100
            ? description.slice(0, 100) + "..."
            : description;

    return (
        <div className="card w-full bg-base-100 shadow-sm">
            <figure className="hidden h-52 overflow-hidden sm:block">
                <img
                    src={`${URL}/${cover_img}`}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            </figure>

            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="badge badge-primary badge-outline">
                    {category}
                </div>
                <p>{shortDescription}</p>
                <p className="text-sm text-base-content/60">{email}</p>

                <div className="card-actions justify-end">
                    <Link to={to} className="btn btn-primary">Подробнее</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;