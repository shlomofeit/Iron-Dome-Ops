import express from "express";
import z, { success } from "zod";
import {
  createIncidentService,
  updateIncidantService,
  getOpensIncidant,
} from "../services/incidents.js";

const incidantValidation = z.object({
  code_name: z.string(),
  threat_level: z.string(),
  operator_id: z.number(),
});

const paramValidation = z.object({
  id: z.coerce.number().int().positive(),
});

export async function createIncident(req, res, next) {
  const valid = incidantValidation.safeParse(req.body);

  if (!valid.success) {
    const err = new Error(`Error: ${valid.error.flatten()}`);
    err.statusCode = 422;
    next(err);
  }

  const incident = await createIncidentService(req.body);
  if (!incident) {
    throw new Error();
  }

  return res.status(201).json({
    success: true,
    message: `operator ${incident} created successfully`,
  });
}

export async function updateIncident(req, res, next) {
  const paramValid = paramValidation.safeParse(req.params.id);
  if (!paramValid.success) {
    const err = new Error("Id must be a number");
    err.statusCode = 400;
    return next(err);
  }
  const incidentId = req.params.id;
  const { status } = req.body;
  if (!status) {
    const err = new Error("invalid request. body must include 'status'");
    err.statusCode = 422;
    return next(err);
  }
  if (["OPEN", "TRACKING", "INTERCEPTED", "CLOSED"].includes(status)) {
    const update = await updateIncidantService(incidentId, req.body);
    if (update) {
      return res
        .status(201)
        .json({
          success: true,
          message: `incident status updated to ${status}`,
        });
    }
  } else {
    const err = new Error(`invalid status`);
    err.statusCode = 400;
    return next(err);
  }
  const bodyKeys = Object.keys(req.body);
  if (bodyKeys === 0 || bodyKeys[0].toLowerCase() !== "status") {
    const err = new Error(`Body can only have 'status' key.`);
    err.statusCode = 422;
    return next(err);
  }
  throw new Error();
}
