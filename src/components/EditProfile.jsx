import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utills/userSlice";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [error, setError] = useState("");
    const [showToast, setShowTOast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                photoURL,
                age,
                gender,
                about,
                skills,
            },{withCredentials: true});
            dispatch(addUser(res?.data?.data));
            setShowTOast(true);
            setTimeout(() => {
                setShowTOast(false);
            },3000);
        }catch(err) {
            setError(err.response.data || "Something went wrong!!");
        };
    };

    return(
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl mr-10">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Edit Profile</h2>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input 
                            type="text" 
                            value={firstName}
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input 
                            type="text" 
                            value={lastName}
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Photo URL</span>
                        </div>
                        <input 
                            type="text" 
                            value={photoURL}
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setPhotoURL(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Age</span>
                        </div>
                        <input 
                            type="number" 
                            value={age}
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Gender</span>
                        </div>
                       <select className="select select-bordered w-full max-w-xs" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option disabled selected>Gender</option>
                            <option>male</option>
                            <option>female</option>
                            <option>others</option>
                        </select>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">About</span>
                        </div>
                        <textarea 
                            className="textarea" 
                            placeholder="About" 
                            value={about} 
                            onChange={(e) => setAbout(e.target.value)}
                        ></textarea>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Skills</span>
                        </div>
                        <textarea 
                            className="textarea" 
                            placeholder="Skills" 
                            value={skills} 
                            onChange={(e) => setSkills(e.target.value)}
                        ></textarea>
                    </label>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center mt-2" onClick={saveProfile}>
                        <button className="btn btn-primary">Save Profile</button>
                    </div>
                </div>
            </div>
            <div>
                <UserCard user={{firstName, lastName, photoURL, age, gender, about, skills}} />
            </div>
           {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Saved Profile Successfully</span>
                </div>
            </div>)}
        </div>
    );
};

export default EditProfile;