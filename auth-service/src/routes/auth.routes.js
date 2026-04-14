import express from "express";
import {
     registerUserController,
        loginUserController,
        refreshTokenController,
        logoutUserController,
        meController
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post('/register',registerUserController);
router.post('/login',loginUserController);
router.post('/refresh-token',refreshTokenController);
router.post('/logout',authMiddleware,logoutUserController);
router.get('/me',authMiddleware,meController);

export default router;