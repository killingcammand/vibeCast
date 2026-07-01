// components/VideoLike.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { likeApi } from "../../../api/like.api.js";
export default function VideoLike({ videoID, userID }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetch likes count
  const fetchLikes = async () => {
    try{
      const res = await likeApi.get("/count", {
        params: {
          targetID: videoID,  
    }
      });
      setLikesCount(res.data.count);
      setLiked(res.data.likedByUser);
    }catch(error){
      console.log("Fetch likes error:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [videoID]);

  // toggle like
  const handleLike = async () => {
    try {
      setLoading(true);

      const res = likeApi.post("/toggle", {
        targetID: videoID,
        userID,
      });
      

      if (res.data.liked) {
        setLikesCount((prev) => prev + 1);
      } else {
        setLikesCount((prev) => prev - 1);
      }

      setLiked(res.data.liked);
    } catch (error) {
      console.log("Like error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={handleLike} disabled={loading}>
        {liked ? "💔 Unlike" : "👍 Like"}
      </button>

      <span style={{ marginLeft: "10px" }}>
        {likesCount} likes
      </span>
    </div>
  );
}