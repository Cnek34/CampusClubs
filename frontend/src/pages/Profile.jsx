import { useUser } from "@services/context/UserContext";

const Profile = () => {
    const { user } = useUser();

    return (
        <div className="">
            Profile
        </div>
    );
}

export default Profile;