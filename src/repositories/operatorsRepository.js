import pool from "./database/db.js";

export async function getOperatorById(operatorId) {
  try {
    const query = `SELECT * FROM operators WHERE id=(?)`;
    const [rows] = await pool.execute(query, [operatorId]);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateOperatorById(operatorId, obj) {
  const keys = Object.keys(obj)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(obj);
  values.push(operatorId);
  const query = `UPDATE operators SET ${keys} WHERE id=?`;

  try {
    const [rows] = await pool.execute(query, values);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createOperator(obj) {
  const query = `INSERT INTO operators (name, rank) VALUES (?, ?)`;
  const { name, rank } = obj;
  try {
    const [rows] = await pool.execute(query, [name, rank]);
    return rows;
  } catch (error) {
    throw new Error(error);
  }
}
