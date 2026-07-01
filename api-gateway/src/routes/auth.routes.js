import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
    pathRewrite: (path) => `/api/auth${path}`,
    cookieDomainRewrite: "localhost",
    on: {
      proxyRes: (proxyRes, req, res) => {
        const cookies = proxyRes.headers["set-cookie"];
        if (cookies) {
          proxyRes.headers["set-cookie"] = cookies.map((cookie) =>
            cookie
              .replace(/Domain=[^;]+;?\s*/gi, "")
              .replace(/SameSite=None/gi, "SameSite=Lax")
              .replace(/Secure;?\s*/gi, "")  // remove Secure flag on localhost
          );
        }
      },
    },
  })
);

export default router;