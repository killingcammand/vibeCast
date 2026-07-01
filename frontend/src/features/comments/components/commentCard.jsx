import { useState } from "react";
import { createComment } from "../services/comment.service";
import { toggleLike } from "../services/like.service";
import { Heart, MessageCircle, Send } from "lucide-react";

export const CommentCard = ({ comment, userID, onCommentAdded, depth = 0 }) => {
  const [likes, setLikes] = useState(comment.likesCount || 0);
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleLike = async () => {
    try {
      const response = await toggleLike({
        targetID: comment.id,
        targetType: "comment",
        videoID: comment.videoID,
        userID,
      });

      const isLiked =
        response.data.message === "Liked successfully";

      setLiked(isLiked);
      setLikes((prev) => prev + (isLiked ? 1 : -1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      setIsReplying(true);

      await createComment({
        videoID: comment.videoID,
        userID,
        text: replyText,
        parentID: comment.id,
      });

      setReplyText("");
      setShowReply(false);
      onCommentAdded?.();
    } catch (error) {
      console.error("Error creating reply:", error);
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 ${
        depth > 0 ? "ml-5 mt-3" : ""
      }`}
    >
      <p className="text-sm leading-6 text-zinc-200">
        {comment.text}
      </p>

      <div className="mt-3 flex items-center gap-4 text-xs text-zinc-400">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 transition hover:text-red-400 ${
            liked ? "text-red-400" : ""
          }`}
        >
          <Heart size={15} />
          {likes}
        </button>

        <button
          onClick={() => setShowReply((prev) => !prev)}
          className="flex items-center gap-1 transition hover:text-indigo-300"
        >
          <MessageCircle size={15} />
          Reply
        </button>
      </div>

      {showReply && (
        <div className="mt-4 flex items-center gap-2">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-indigo-400"
          />

          <button
            onClick={handleReply}
            disabled={isReplying || !replyText.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={15} />
          </button>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-3 border-l border-zinc-800 pl-3">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              userID={userID}
              onCommentAdded={onCommentAdded}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};