import Router from "express";
import verifyToken from "../middleware/jwtAuth.js";
import {
  getActiveHints,
  getReviewHints,
  getUser,
  getStats,
} from "./controllers.js";

const router = Router();

router.post("/active-hints", verifyToken, getActiveHints);
router.post("/review-hints", verifyToken, getReviewHints);
router.get("/user", verifyToken, getUser);
router.get("/stats", verifyToken, getStats);

export default router;
