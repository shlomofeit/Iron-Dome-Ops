import express from "express";
import { createOperator } from "../controllers/operators.js";

const router = express.Router();

router.post("/", createOperator);

export default router;
