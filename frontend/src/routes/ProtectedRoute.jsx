import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken ,loading} = useAuth();
  if(loading) {
    return <div>Loading...</div>;
  }
console.log("Token:", accessToken, "Loading:", loading);
    if (!accessToken) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;