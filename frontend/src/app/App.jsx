import {Routes,Route,BrowserRouter} from 'react-router-dom'
import { AuthProvider } from '../features/auth/context/AuthContext.jsx'
import ProtectedRoute from '../routes/ProtectedRoute.jsx'
import Dashboard from "../features/auth/pages/Dashboard.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Navbar from '../features/auth/components/Navbar.jsx';

export default function App() {
    
  return (
         <>
        <Navbar /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        </>
  );

};

