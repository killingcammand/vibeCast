import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard"); // Redirect to dashboard after successful login
            
        } catch (error) {
            console.error("Login failed:", error);
            // Show error message to user
        }
    };

    return (
        <form onSubmit={handleSubmit}>
      <input onChange={(e)=>setEmail(e.target.value)} placeholder="email" />
      <input onChange={(e)=>setPassword(e.target.value)} placeholder="password" type="password"/>
      <button type="submit">Login</button>
    </form>
    );
};