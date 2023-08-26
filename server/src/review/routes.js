import Router from "express";
import { approveHint, rejectHint, showHints } from "./controller.js";
import isAdmin from "../middleware/isAdmin.js";
import jwtVerify from "../middleware/jwtAuth.js";

const router = Router();
router.get("/", jwtVerify, isAdmin, showHints);
router.delete("/:id", jwtVerify, isAdmin, rejectHint);
router.post("/", jwtVerify, isAdmin, approveHint);
export default router;
