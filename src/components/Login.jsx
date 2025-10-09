import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utills/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utills/constants";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setIsLoginForm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL+ "/login", {
                email,
                password,
            },{withCredentials: true});
            dispatch(addUser(res.data));
            navigate("/");
        } catch (err) {
            setError(err.response.data || "Something went wrong!!");
        };
    };

    const handleSignUp = async () => {
        try{
            const res = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                email,
                password,
            },{withCredentials: true});
            dispatch(addUser(res?.data?.data));
            navigate("/profile");
        }
        catch(err) {
            setError(err.response.data || "Something went wrong!!");
        };
    };

    return (
        <div className="card bg-base-300 w-96 shadow-xl mx-auto my-20">
            <div className="card-body">
                <h2 className="card-title">{!isLoginForm ? "Login" : "Sign Up"}</h2>

               {isLoginForm &&  (<>
                <label className="form-control w-full max-w-xs pt-2">
                    <div className="label py-1">
                        <span className="label-text">First Name</span>
                    </div>
                    <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                        value={firstName}  
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>

                <label className="form-control w-full max-w-xs pt-2">
                    <div className="label py-1">
                        <span className="label-text">Last Name</span>
                    </div>
                    <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                        value={lastName}  
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                </>)}

                <label className="form-control w-full max-w-xs pt-2">
                    <div className="label py-1">
                        <span className="label-text">Email ID</span>
                    </div>
                    <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                        value={email}  
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label className="form-control w-full max-w-xs pt-2">
                    <div className="label py-1">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" placeholder="" className="input input-bordered w-full max-w-xs" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center pt-4">
                    <button 
                        className="btn btn-primary" 
                        onClick={!isLoginForm ? handleLogin : handleSignUp}
                        
                    >
                        {!isLoginForm ? "Login" : "Sign Up"}
                    </button>
                </div>
                <p className="flex justify-center mt-4 cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>
                    {isLoginForm ? "New User? Sign Up here" : "Exiting User? Login here"}
                </p>

            </div>
        </div>
    );
};

export default Login;