import { useUser } from "@services/context/UserContext";

const Profile = () => {
    const { user } = useUser();
    console.log(user)

    return (
        <div className="">
            Profile
        </div>
    );
}

export default Profile;