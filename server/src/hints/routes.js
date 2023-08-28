import Router from "express";
import {
  addTemporaryHint,
  upDownvoteHint,
  getHints,
  getHintsByVotes,
} from "./controller.js";
import jwtAuth from "../middleware/jwtAuth.js";
const router = Router();
router.post("/", jwtAuth, addTemporaryHint);
router.post("/gethints", getHints);
router.post("/getHintsByVotes", getHintsByVotes);
router.post("/updownvote", upDownvoteHint);
// router.post('/downvote',jwtAuth,downvoteHint);
export default router;
