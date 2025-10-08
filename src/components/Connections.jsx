import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utills/connectionSlice";
import { useEffect } from "react";

const Connections = () => {
    const connections = useSelector((store) => store.connections); 
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL || "http://localhost:2006" + "/user/connections", {withCredentials: true});
            dispatch(addConnection(res?.data?.data));
        }
        catch(err) {
            console.error(err.message);
        };
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;
    
    if(connections.length === 0) return <h1 className="flex justify-center my-10 text-white text-3xl font-bold">No Connections Found</h1>;

    return(
        <div className="text-center my-10">
            <h1 className="text-white text-3xl font-bold">
                Connections
            </h1>
            {connections.map((connection) => {
                const {
                    _id,
                    firstName, 
                    lastName, 
                    photoURL, 
                    about,
                } = connection;

                return(
                    <div key={_id} className="flex m-4 p-4 bg-base-300 w-1/2 mx-auto my-4 rounded-xl">
                        <div className="ml-4">
                            <img 
                                alt="profile"
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoURL}
                            />
                        </div>
                        <div className="ml-10">
                            <h2 className="font-bold text-lg">{firstName + " " + lastName + ","}</h2>
                            <div>
                                <p>{about}</p>
                            </div>
                        </div>
                        
                    </div>)
                })
            }
        </div>
    );
};

export default Connections;