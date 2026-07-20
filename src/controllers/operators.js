import express from "express";
import z from "zod";
import { createOparetorService } from "../services/operators.js";

const operatorValidation = z.object({
  name: z.string(),
  rank: z.string(),
});

export async function createOperator(req, res, next) {
  const valid = operatorValidation.safeParse(req.body);

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
