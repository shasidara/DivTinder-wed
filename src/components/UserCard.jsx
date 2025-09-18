import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utills/feedSlice";

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    const {
        _id,
        firstName,
        lastName,
        photoURL,
        age,
        gender,
        about,
        skills,
    }= user;

    const handleSendRequest = async (status, _id) => {
        try{
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {withCredentials: true});
            dispatch(removeUserFromFeed(_id));
        }
        catch(err) {
            console.error(err.message);
        };
    };

    return(
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                className="object-cover"
                src={photoURL}
                alt="Profile" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && (<p>{age + ", " + gender}</p>)}
                <p>{about}</p>
                <p>{skills}</p>
                <div className="card-actions justify-center mt-4">
                    <button 
                        className="btn btn-primary"
                        onClick={() => handleSendRequest("ignored", _id)}
                    >
                        ignore
                    </button>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest("interested", _id)}
                    >
                        interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;