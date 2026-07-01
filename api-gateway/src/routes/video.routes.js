// routes/video.routes.js (gateway)
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5001", // your video service port
    changeOrigin: true,
    pathRewrite: (path) => `/api/videos${path}`,

    // ✅ Critical for large video file uploads
    proxyTimeout: 300000,   // 5 min — uploads take time
    timeout: 300000,

    on: {
      proxyReq: (proxyReq, req) => {
        // ✅ Forward auth token from header to video service
        const auth = req.headers["authorization"];
        if (auth) proxyReq.setHeader("authorization", auth);

        // ✅ DO NOT touch body here — multipart streams through as-is
      },

      proxyRes: (proxyRes, req, res) => {
        // ✅ Allow cross-origin streaming URLs in response
        proxyRes.headers["access-control-allow-origin"] = "http://localhost:5173";
        proxyRes.headers["access-control-allow-credentials"] = "true";
      },

      error: (err, req, res) => {
        console.error("Video proxy error:", err.message);
        res.status(502).json({ 
          success: false, 
          message: "Video service unavailable" 
        });
      },
    },
  })
);

export default router;