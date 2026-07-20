import { createLogs } from "./repositories/logsRepository.js";
import { createOperator } from "./repositories/operatorsRepository.js";

export async function createOparetorService(obj) {
  const id = await createOperator(obj);
  if (id) {
    const logRepo = await createLogs({
      action: "create operator",
      operator_id: id,
      description: "new operator",
    });

    return id;
  }
  return false;
}
