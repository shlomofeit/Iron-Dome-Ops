import { createLogs } from "../repositories/logsRepository.js";
import {
  createIncident,
  getIncidentById,
  updateIncidentById,
  getIncidantByStatus,
} from "../repositories/incidentsRepository.js";

export async function createIncidentService(obj) {
  const operator = await getOperatorById(obj.operator_id);
  if (!operator || operator.length === 0) {
    const err = new Error("Operator not found");
    err.statusCode = 404;
    throw err;
  }

  const incidentData = { ...obj, status: "OPEN" };
  const id = await createIncident(incidentData);
  if (id) {
    await createLogs({
      action: "INCIDENT_CREATED",
      incident_id: id,
      operator_id: obj.operator_id,
      description: "New incident created",
    });
    return id;
  }
  return false;
}

export async function updateIncidantService(incidantId, status) {
  const findIncidantById = await getIncidentById(incidantId);
  if (!findIncidantById) {
    return false;
  }
  const update = await updateIncidentById(incidantId, status);
  if (update) {
    const logRepo = await createLogs({
      action: "status changed",
      incident_id: incidantId,
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
