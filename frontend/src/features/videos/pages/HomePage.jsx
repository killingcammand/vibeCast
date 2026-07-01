import { useEffect,useState } from "react";

import { videoApi } from "../../../api/video.api";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../services/video.service";
export default function HomePage() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await getVideos();
                setVideos(res.data.videos);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        };
        fetchVideos();
    }, []);
    return (
        <div>
            <h1>Home Page</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
}
