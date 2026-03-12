import express from "express";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import AppError from "./utils/AppError.js";
import trackRoutes from "./routes/trackRoutes.js";
import swaggerRoutes from "./routes/swaggerRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());

// Basic Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "API is healthy" });
});

// CORS Middleware
app.use(cors());

// Swagger Routes
app.use(swaggerRoutes);

// Routes will be mounted here
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/tracks", trackRoutes);

// Handling Undefined Routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler (Must be the last middleware)
app.use(globalErrorHandler);

export default app;
