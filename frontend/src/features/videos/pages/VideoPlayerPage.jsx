import {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
// import VideoLike from "../components/VideoLikeCard.jsx";
import Comments from "../../comments/components/comment.jsx";
import { getVideoById } from "../services/video.service";
import { getUserIDUtil } from "../../../utils/authUtils.js";
import StreamingPlayer from "../components/StreamingPlayer.jsx";

export default function VideoPlayerPage() {
    const { videoID } = useParams();
    const [video, setVideo] = useState(null);
 console.log("Video ID from URL:", videoID);
    const userID = getUserIDUtil();
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await getVideoById(videoID);
                setVideo(res.data.video);
            } catch (error) {
                console.error("Failed to fetch video:", error);
            }
        };
        fetchVideo();
    }, [videoID]);

    if (!video) {
        return <div>Loading...</div>;
    }
   return (
  <div>
    <h1>{video.title}</h1>

    {/* <video
      key={video.videoUrl}
      src={video.videoUrl}
      controls
      width="600"
    >
      Your browser does not support the video tag.

    </video> */}
    <StreamingPlayer streamUrl={video.streamUrl} />
    
     {/* Video Like}
      <VideoLike videoID={videoID} userID={userID} />

      {/* Comments */}
      <Comments videoID={videoID} userID={userID}  />

  </div>
);
}