
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext.jsx";
import NotificationBell from "../features/notifications/components/NotificationBell.components.jsx";
import useNotifications from "../features/notifications/hooks/useNotification.hooks.js";


export default function Navbar() {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const { notifications } = useNotifications();
  const unreadCount =
  notifications.filter(
    (n) => !n.read
  ).length;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to={accessToken ? "/" : "/"}
          className="text-[17px] font-semibold tracking-tight text-white"
        >
          VibeCast
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-5">
          {accessToken ? (
            <>
              <Link
                to="/dashboard"
                className={`text-sm transition-colors hover:text-white ${
                  isActive("/dashboard") ? "text-white" : "text-zinc-400"
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                Logout
              </button>
              <NotificationBell
                     count={unreadCount}
                  
              />
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-sm transition-colors hover:text-white ${
                  isActive("/login") ? "text-white" : "text-zinc-400"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`text-sm transition-colors hover:text-white ${
                  isActive("/register") ? "text-white" : "text-zinc-400"
                }`}
              >
                Register
              </Link>
              
            </>
          )}
        </nav>

      </div>
    </header>
  );
}