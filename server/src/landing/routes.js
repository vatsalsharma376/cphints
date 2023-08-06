import Router from "express";
import { getPlatfromData} from "./controllers.js";

const router = Router();

router.get("/", getPlatfromData);

export default router;