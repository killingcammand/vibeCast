// import {useNavigate} from "react-router-dom";

// export default function VideoCard({ video }) {
//     const navigate = useNavigate();
//     const handleClick = () => {
//         navigate(`/video/${video._id}`);
//     }
//     return (
//         <div onClick={handleClick} style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
//             <h3>{video.title}</h3>
//             <p>Duration: {Math.floor(video.duration / 60)}:{video.duration % 60 < 10 ? '0' : ''}{video.duration % 60} mins</p>
//         </div>
//     );
// }   

import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatViews(views) {
  if (!views) return null;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;
  return `${views} views`;
}

function timeAgo(dateStr) {
  if (!dateStr) return null;
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/video/${video._id}`);

  const duration = formatDuration(video.duration ?? 0);
  const views = formatViews(video.views);
  const ago = timeAgo(video.createdAt);

  // Initials avatar fallback for channel
  const initials = video.channelName
    ? video.channelName.slice(0, 2).toUpperCase()
    : "VC";

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden border-zinc-800 bg-zinc-900 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/80"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          /* Placeholder when no thumbnail */
          <div className="flex h-full w-full items-center justify-center bg-zinc-800">
            <svg
              className="h-10 w-10 text-zinc-600"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2">
          <Badge className="rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white hover:bg-black/80">
            {duration}
          </Badge>
        </div>

        {/* Play overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/30">
          <div className="flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            <svg className="ml-0.5 h-5 w-5 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex gap-3 p-3">
        {/* Channel avatar */}
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-[11px] font-semibold text-zinc-300">
          {video.channelAvatar ? (
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Title — clamp to 2 lines */}
          <h3 className="line-clamp-2 text-[13.5px] font-medium leading-snug text-white group-hover:text-zinc-100">
            {video.title}
          </h3>

          {/* Channel name */}
          {video.channelName && (
            <p className="mt-1 text-[12px] text-zinc-500 hover:text-zinc-300">
              {video.channelName}
            </p>
          )}

          {/* Meta: views · time */}
          <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-zinc-600">
            {views && <span>{views}</span>}
            {views && ago && <span>·</span>}
            {ago && <span>{ago}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}