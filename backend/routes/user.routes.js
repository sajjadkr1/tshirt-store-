import express from "express";
import { getHello } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/Hello", getHello);

export default router;