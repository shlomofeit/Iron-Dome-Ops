import express from "express";
import {
  createIncident,
  updateIncident,
  getOpensIncident,
} from "../controllers/incidents.js";

const router = express.Router();

router.post("/", createIncident);
router.patch("/:id/status", updateIncident);
router.get("/open", getOpensIncident);

export default router;
