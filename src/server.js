import express from "express";
import { errorHandler, logger } from "./middlewares.js";
import operatorsRoute from "./routes/operatorsRoute.js";
import incidentsRoute from "./routes/incidentsRoute.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(logger);

// routes
app.use("/operators", operatorsRoute);
app.use("/incidents", incidentsRoute);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
