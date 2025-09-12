import { useState } from "react";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try{
            const res = await axios.post("http://localhost:2006/login", {
                email,
                password,
            },{withCredentials: true});
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div className="card bg-base-300 w-96 shadow-xl mx-auto my-20">
            <div className="card-body">
                <h2 className="card-title">Login</h2>

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
                    <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <div className="card-actions justify-center pt-4">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>

            </div>
        </div>
    );
};

export default Login;