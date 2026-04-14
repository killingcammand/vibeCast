import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();
  console.log("Token:", accessToken);
    // if (!accessToken) {
    //     return <Navigate to="/login" />;
    // }
    return children;
};

export default ProtectedRoute;