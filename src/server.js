// src/server.js
import morgan from "morgan";
import express from "express";
import { connect } from "mongoose";

import { router } from "./routes/index.routes.js";
import { CONFIG } from "./config/config.js";

const app = express();

// Express config
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connect(CONFIG.mongoDB.url)  // Usando la URL correcta
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Routes
app.use("/api", router);

// Start server
app.listen(CONFIG.PORT, () => {  // Usando CONFIG.PORT
  console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});
