import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utills/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL || "http://localhost:2006" + "/user/request/received", {withCredentials: true});
            dispatch(addRequest(res?.data?.data));
        }
        catch(err) {
            console.error(err.message);
        };
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const reviewRequest = async (status, _id) => {
        try{
            const res = await axios.post(BASE_URL || "http://localhost:2006" + "/request/review/" + status + "/" + _id, {}, {withCredentials: true});
            dispatch(removeRequest(_id));
        }
        catch(err) {
            console.error(err.message);
        };
    };

    if(!requests) return;

    if(requests.length == 0) return <h1 className="flex justify-center my-10 text-white text-3xl font-bold">No Requests Found</h1>

    return(
        requests && (<div className="text-center my-10">
            <h1 className="text-white text-3xl font-bold">
                Connection Requests
            </h1>
            {requests.map((request) => {
                const {
                    _id,
                    firstName, 
                    lastName, 
                    photoURL, 
                    about,
                } = request.fromUserId;

                return(
                    <div key={_id} className="flex m-4 p-4 bg-base-300 w-1/2 mx-auto my-4 justify-between items-center">
                        <div className="ml-4">
                            <img 
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoURL}
                            />
                        </div>
                        <div className="ml-10">
                            <h2 className="font-bold text-lg">{firstName + " " + lastName + " ,"}</h2>
                            <div>
                                <p>{about}</p>
                            </div>
                        </div>
                        <div className="flex rounded-sm">
                            <button 
                                className="btn btn-primary mr-2"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                Reject
                            </button>
                            <button 
                                className="btn btn-secondary"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>)
                })
            }
        </div>)
    );
};

export default Requests;