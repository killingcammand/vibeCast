import useNotifications from "../hooks/useNotification.hooks.js";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Video,
} from "lucide-react";

const getIcon = (type) => {
  switch (type) {
    case "REPLY":
      return <MessageCircle size={20} />;
    case "LIKE":
      return <Heart size={20} />;
    case "FOLLOW":
      return <UserPlus size={20} />;
    case "VIDEO_UPLOADED":
      return <Video size={20} />;
    default:
      return <Bell size={20} />;
  }
};

export default function Notifications() {
  const { notifications } = useNotifications();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Notifications</h1>
          <p className="mt-2 text-zinc-500">
            Replies, likes and activity on your account.
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
            <Bell
              size={42}
              className="mx-auto mb-4 text-zinc-600"
            />

            <h2 className="text-xl font-semibold">
              You're all caught up
            </h2>

            <p className="mt-2 text-zinc-500">
              New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {notifications.map((n) => (
              <div
                key={n._id}
                className={`group flex items-start gap-4 rounded-2xl border p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900 ${
                  !n.read
                    ? "border-zinc-700 bg-zinc-900/70"
                    : "border-zinc-800 bg-zinc-950"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <p className="font-medium text-zinc-100">
                      {n.message}
                    </p>

                    {!n.read && (
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                    <span>{n.type}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(
                        new Date(n.createdAt),
                        { addSuffix: true }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}