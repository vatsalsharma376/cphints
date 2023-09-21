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
router.post("/gethints",jwtAuth, getHints);
router.post("/getHintsByVotes",jwtAuth, getHintsByVotes);
router.post("/updownvote",jwtAuth, upDownvoteHint);
export default router;
