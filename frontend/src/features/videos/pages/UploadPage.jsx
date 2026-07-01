import { useState } from "react";
import { uploadVideo } from "../services/video.service";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");

    const handleUpload = async () => {  
        if (!file || !title) {  
            alert("Please provide both a title and a video file.");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("video", file);

        try {
            const res= await uploadVideo(formData);
            alert("Video uploaded successfully!");
            console.log(res.data);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload video. Please try again.");
        }
    };

    return (
        <div>
      <h2>Upload Video</h2>

      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
    );
}