import pool from "../database/db.js";

export async function getLogById(incidentId) {
  try {
    const query = `SELECT * FROM logs WHERE id=(?)`;
    const [rows] = await pool.execute(query, [incidentId]);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateLogsById(incidentId, obj) {
  const keys = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(incidentId);

  const query = `UPDATE logs SET ${keys} WHERE id=?`;

  try {
    const [rows] = await pool.execute(query, values);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createLogs(obj) {
  // const { code_name, threat_level, status, operator_id } = obj;
  const keys = Object.keys(obj).join(", ");
  const values = Object.values(obj)
    .map(() => "?")
    .join(", ");
  const query = `INSERT INTO logs (${keys}) VALUES (${values})`;
  try {
    const [rows] = await pool.execute(query, Object.values(obj));
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}
