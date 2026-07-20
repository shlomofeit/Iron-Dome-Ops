import { createLogs } from "./repositories/logsRepository.js";
import {
  createIncident,
  getIncidentById,
  updateIncidentById,
  getIncidantByStatus,
} from "../repositories/incidentsRepository.js";

export async function createIncidentService(obj) {
  const id = await createIncident(obj);
  if (id) {
    const logRepo = await createLogs({
      action: "create incidant",
      incident_id: id,
      description: "new incidant",
    });

    return id;
  }
  return false;
}

export async function updateIncidantService(incidantId, status) {
  const findIncidantById = await getIncidentById(incidantId);
  if (!id) {
    return false;
  }
  const update = await updateIncidentById(incidantId, status);
  if (update) {
    const logRepo = await createLogs({
      action: "status changed",
      incidantId,
      description: `status changed to ${status.status}`,
    });
    return update;
  }
  return false;
}

export async function getOpensIncidant() {
  const openIncidance = await getIncidantByStatus("OPEN");
  return openIncidance;
}
