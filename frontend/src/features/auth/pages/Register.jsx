// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await register(
//         formData.name,
//         formData.email,
//         formData.password
//       );

//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white">
      
//       {/* Navbar */}
//       <header className="border-b border-zinc-800">
//         <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
//           <h1 className="text-2xl font-bold tracking-tight">
//             VibeCast
//           </h1>

//           <div className="flex gap-6 text-sm text-zinc-400">
//             <Link to="/login" className="hover:text-white">
//               Login
//             </Link>

//             <Link to="/register" className="hover:text-white">
//               Register
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Register Form */}
//       <div className="flex items-center justify-center px-4 py-20">
//         <Card className="w-full max-w-md border-zinc-800 bg-zinc-900 shadow-2xl">
          
//           <CardHeader className="space-y-2 text-center">
//             <CardTitle className="text-3xl font-bold">
//               Create Account
//             </CardTitle>

//             <CardDescription className="text-zinc-400">
//               Join VibeCast and start sharing videos
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-5"
//             >
//               <Input
//                 name="name"
//                 placeholder="Full name"
//                 onChange={handleChange}
//                 className="h-11"
//               />

//               <Input
//                 name="email"
//                 placeholder="Email"
//                 onChange={handleChange}
//                 className="h-11"
//               />

//               <Input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 className="h-11"
//               />

//               <Button
//                 type="submit"
//                 className="h-11 w-full text-base font-semibold"
//               >
//                 Register
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
// import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
      await register(formData.name, formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">

      {/* <Navbar /> */}

      {/* Page body — takes all remaining height and centers the card */}
      <main className="flex flex-1 items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-[400px]">

          <Card className="border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50">
            <CardHeader className="space-y-1.5 px-5 pb-4 pt-6 text-center sm:px-6 sm:pt-7">
              {/* Badge */}
              <div className="mb-1 flex justify-center">
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-[11px] text-zinc-400">
                  ✦ New
                </span>
              </div>
              <CardTitle className="text-xl font-semibold text-white sm:text-[22px]">
                Create account
              </CardTitle>
              <CardDescription className="text-[13px] text-zinc-500">
                Join VibeCast and start sharing videos
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-6 sm:px-6 sm:pb-7">
              <form onSubmit={handleSubmit} className="space-y-2.5">

                {error && (
                  <div className="rounded-md border border-red-900/50 bg-red-950/30 px-3 py-2.5 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-zinc-600"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <Input
                    name="name"
                    placeholder="Full name"
                    autoComplete="name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                    className="h-10 border-zinc-700/80 bg-zinc-950/80 pl-9 text-sm text-white placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-0 sm:h-11"
                  />
                </div>

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
                    className="h-10 border-zinc-700/80 bg-zinc-950/80 pl-9 text-sm text-white placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-0 sm:h-11"
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
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="h-10 border-zinc-700/80 bg-zinc-950/80 pl-9 pr-10 text-sm text-white placeholder:text-zinc-600 focus-visible:border-zinc-600 focus-visible:ring-0 sm:h-11"
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="mt-1 h-10 w-full bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <p className="mt-4 text-center text-[13px] text-zinc-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-zinc-300 transition-colors hover:text-white"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}