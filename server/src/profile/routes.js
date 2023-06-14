import Router from "express";
import verifyToken from "../middleware/jwtAuth.js";
import { getActiveHints, getUser } from "./controllers.js";

const router = Router();

router.post("/active-hints", verifyToken, getActiveHints);
router.post("/user", verifyToken, getUser);

export default router;
