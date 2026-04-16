import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { LogOut } from "../api/logout";
import logo from '../assets/PCGG-Logo.png'
import "./userHeader.css";

export function UserHeader() {
    const navigate = useNavigate();
    const { accessToken, setAccessToken} = useAuth();

    async function logout() {
        const choice = confirm('Are you sure you want to logout?')

        if(choice) {
            const result = await LogOut(accessToken)
         
            if (!result.success) {
                return alert(result.message)
            }
            setAccessToken(null)
            navigate("/login");
        }
    }

    return (
        <header className="user-header">
            {/* Left - Logo */}
            <div className="left" onClick={() => navigate("/homepage")}>
                <div className="logo" >
                    <img src={logo} alt="pcgg-logo" className="pcgg-logo-header"/>
                </div>
                <span className="app-name">Strategic Performance Management System</span>
            </div>

            {/* Right - Actions */}
            <div className="right">
                <button
                    className="icon-btn"
                    onClick={() => navigate("/profile")}
                    title="Profile"
                >
                    <CgProfile />
                </button>

                <button
                    className="icon-btn logout"
                    onClick={logout}
                    title="Logout"
                >
                    <FiLogOut />
                </button>
            </div>
        </header>
    );
}