import { formatDistanceToNow } from "date-fns";
import { Bell, MessageCircle, Heart, UserPlus } from "lucide-react";

const getIcon = (type) => {
  if (type === "REPLY") return <MessageCircle size={20} />;
  if (type === "LIKE") return <Heart size={20} />;
  if (type === "FOLLOW") return <UserPlus size={20} />;
  return <Bell size={20} />;
};

export default function Notifications({ notifications = [] }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Stay updated with activity on your videos and comments.
          </p>
        </div>

        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-10 text-center">
            <Bell className="mx-auto mb-3 text-zinc-500" size={34} />
            <h2 className="text-lg font-medium">No notifications yet</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Replies, likes, and follows will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`flex items-start gap-4 rounded-2xl border p-4 transition hover:bg-zinc-900 ${
                  !n.read
                    ? "border-zinc-700 bg-zinc-900/80"
                    : "border-zinc-800 bg-zinc-950"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300">
                  {getIcon(n.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm leading-6 text-zinc-200">
                      {n.message}
                    </p>

                    {!n.read && (
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                    <span>{n.type}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(n.createdAt), {
                        addSuffix: true,
                      })}
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