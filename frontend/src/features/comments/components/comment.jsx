import { useEffect, useState } from "react";
import { CommentCard } from "./commentCard.jsx";
import { getComments, createComment } from "../services/comment.service.js";
import { Send } from "lucide-react";
import {
  connectCommentSocket,
  joinVideoRoom,
  listenForNewComments,
  removeNewCommentListener,
  disconnectCommentSocket,
} from "../services/socket.service.js";

export default function Comments({ videoID, userID }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const fetchComments = async () => {
    if (!videoID) return;

    const res = await getComments(videoID);
    setComments(res.data.comments || []);
  };

  useEffect(() => {
    fetchComments();
  }, [videoID]);

  useEffect(() => {
    if (!videoID) return;

    connectCommentSocket();
    joinVideoRoom(videoID);

    listenForNewComments((newComment) => {
      if (newComment.parentID) {
        fetchComments();
        return;
      }
      console.log("New comment received via socket:", newComment);

      setComments((prev) => {
        const exists = prev.some((c) => c.id === newComment.id);
        if (exists) return prev;

        return [newComment, ...prev];
      });
    });

    return () => {
      removeNewCommentListener();
      disconnectCommentSocket();
    };
  }, [videoID]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    try {
      setIsPosting(true);

      await createComment({
        videoID,
        userID,
        text,
        parentID: null,
      });

      setText("");
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-2xl text-zinc-200">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Comments</h3>

        <span className="text-sm text-zinc-500">
          {comments.length} comments
        </span>
      </div>

      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
        <div className="flex items-center gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-indigo-400"
          />

          <button
            onClick={handleSubmit}
            disabled={isPosting || !text.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 p-8 text-center text-zinc-500">
          No comments yet. Be the first to comment.
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <CommentCard
              key={c.id}
              comment={c}
              userID={userID}
              onCommentAdded={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}