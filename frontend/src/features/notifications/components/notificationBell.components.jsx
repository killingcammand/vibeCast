import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificationBell({ count }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => navigate("/notifications")}
    >
      <Bell size={22} />

      {count > 0 && (
        <span
          className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            text-xs
            rounded-full
            px-1.5
          "
        >
          {count}
        </span>
      )}
    </div>
  );
}