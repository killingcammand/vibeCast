import { useEffect,useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const { logout,getMe } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("Fetching user data...");
                const userData = await getMe();
                console.log("User data:", userData);
                setUser(userData.user);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };  
        fetchUser();
    }, [getMe]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <div>
            
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}