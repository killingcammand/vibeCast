// routes/comment.routes.js (gateway)
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5002", // your comment service port
    changeOrigin: true,
    pathRewrite: (path) => `/api/comments${path}`,

    on: {
      proxyReq: (proxyReq, req) => {
        // ✅ Forward auth token so comment service can verify user
        const auth = req.headers["authorization"];
        if (auth) proxyReq.setHeader("authorization", auth);

        // ✅ Re-attach JSON body if already parsed by express.json()
        if (req.body && Object.keys(req.body).length > 0) {
          const body = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(body));
          proxyReq.write(body);
        }
      },

      error: (err, req, res) => {
        console.error("Comment proxy error:", err.message);
        res.status(502).json({
          success: false,
          message: "Comment service unavailable",
        });
      },
    },
  })
);

export default router;