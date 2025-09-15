import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utills/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try{
            if(feed) return;
            const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
            dispatch(addFeed(res?.data?.data));
        }catch (err) {
            console.error(err.message);
        };
    };

    useEffect(() => {
        getFeed();
    }, []);

    return(
        feed && (<div className="flex justify-center my-10 mb-20">
            <UserCard user={feed[0]} />
        </div>)
    );
};

export default Feed;