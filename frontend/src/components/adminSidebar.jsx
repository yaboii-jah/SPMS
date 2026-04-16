import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { LogOut } from "../api/logout";
import "./adminSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
   const { accessToken, setAccessToken} = useAuth();

  const handleLogout = async () => {
    const choice = confirm('Are you sure you want to logout?')

    if(choice) {
        const result = await LogOut(accessToken)
    
        if (!result.success) {
            return alert(result.message)
        }
        setAccessToken(null)
        navigate("/login");
    }
  };

  const menuItems = [
    { name: "Dashboard", path: "/list" },
    { name: "View Users", path: "/userList" },
    { name: "Add User", path: "/addUser" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Admin Panel</div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`sidebar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}