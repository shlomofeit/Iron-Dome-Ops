import express from "express";
import { errorHandler, logger } from "./middlewares.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(logger);

// routes
app.use("/operators");

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
