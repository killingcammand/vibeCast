import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function StreamingPlayer({ streamUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // 🔥 HLS supported
    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30,
        enableWorker: true,
      });

      hls.loadSource(streamUrl);

      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest loaded");
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS Error:", data);
      });

      return () => {
        hls.destroy();
      };
    }

    // 🔥 Safari native HLS support
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
    }
  }, [streamUrl]);

  return (
    <video
      ref={videoRef}
      controls
      width="60%"
      className="rounded-xl"
    />
  );
}