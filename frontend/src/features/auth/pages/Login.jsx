// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// export default function Login() {
//     const { login } = useAuth();
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await login(email, password);
//             navigate("/dashboard"); // Redirect to dashboard after successful login
            
//         } catch (error) {
//             console.error("Login failed:", error);
//             // Show error message to user
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//       <input onChange={(e)=>setEmail(e.target.value)} placeholder="email" />
//       <input onChange={(e)=>setPassword(e.target.value)} placeholder="password" type="password"/>
//       <button type="submit">Login</button>
//     </form>
//     );
// };

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Page body */}
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-14">
        <div className="w-full max-w-[400px]">

          <Card className="border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50">
            <CardHeader className="space-y-1.5 pb-5 pt-7 text-center">
              <CardTitle className="text-[22px] font-semibold text-white">
                Welcome back
              </CardTitle>
              <CardDescription className="text-[13px] text-zinc-500">
                Sign in to your VibeCast account
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-7">
              <form onSubmit={handleSubmit} className="space-y-3">

                {error && (
                  <div className="rounded-md border border-red-900/50 bg-red-950/30 px-3 py-2.5 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-zinc-600"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    className="h-11 border-zinc-700/80 bg-zinc-950/80 pl-9 text-sm text-white placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-0"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-zinc-600"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="h-11 border-zinc-700/80 bg-zinc-950/80 pl-9 pr-10 text-sm text-white placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-400"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Forgot password */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-[12px] text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 w-full bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <p className="mt-5 text-center text-[13px] text-zinc-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  Create one
                </Link>
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}