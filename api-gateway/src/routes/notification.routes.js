import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5004",
    changeOrigin: true,
    pathRewrite: (path) => `/api/notifications${path}`,

    on: {
      proxyReq: (proxyReq, req) => {
        const auth = req.headers["authorization"];
        if (auth) proxyReq.setHeader("authorization", auth);

        if (req.body && Object.keys(req.body).length > 0) {
          const body = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(body));
          proxyReq.write(body);
        }
      },

      error: (err, req, res) => {
        console.error("Notification proxy error:", err.message);
        res.status(502).json({
          success: false,
          message: "Notification service unavailable",
        });
      },
    },
  })
);

export default router;