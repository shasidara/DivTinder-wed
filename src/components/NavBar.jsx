import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utills/constants";
import { removeUser } from "../utills/userSlice";

const NavBar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await axios.post(BASE_URL || "http://localhost:2006" + "/logout", {}, {withCredentials: true});
            dispatch(removeUser());
            navigate("/login");
        }catch (err) {
            console.error(err.message);
        };
    };

    return (
        <div>
             <div className="navbar bg-base-300">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">🧑‍💻 Dev Tinder</Link>
                </div>
                {user && (<div className="flex-none gap-2 flex items-center">
                    <div className="form-control">Welcome, {user.firstName}</div>
                    <div className="dropdown dropdown-end mx-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="User Photo"
                                src={user.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections">Connections</Link>
                            </li>
                            <li>
                                <Link to="/requests">Requests</Link>
                            </li>
                            <li>
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default NavBar;