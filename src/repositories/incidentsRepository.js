import pool from "./database/db.js";

export async function getIncidentById(incidentId) {
  try {
    const query = `SELECT * FROM incidents WHERE id=(?)`;
    const [rows] = await pool.execute(query, [incidentId]);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getIncidantByStatus(status) {
  try {
    const query = `SELECT * FROM incidents WHERE status = (?)`;
    const [rows] = await pool.execute(query, [status]);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateIncidentById(incidentId, obj) {
  const keys = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(incidentId);
  const query = `UPDATE incidents SET ${keys} WHERE id=?`;

  try {
    const [rows] = await pool.execute(query, values);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createIncident(obj) {
  const query = `INSERT INTO incidents (code_name, threat_level, status, operator_id) VALUES (?, ?, ?, ?)`;
  const { code_name, threat_level, status, operator_id } = obj;
  try {
    const [rows] = await pool.execute(query, [
      code_name,
      threat_level,
      status,
      operator_id,
    ]);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}
