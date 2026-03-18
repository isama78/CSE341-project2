import express from "express";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import AppError from "./utils/AppError.js";
import trackRoutes from "./routes/trackRoutes.js";
import swaggerRoutes from "./routes/swaggerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// CORS
app.use(cors({ origin: true, credentials: true })); // Si usas CORS, debe tener credentials

// Configure session
app.use(session({
  secret: 'un-secreto-muy-seguro',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Ponlo en false para localhost (HTTP)
    httpOnly: true,
    sameSite: 'lax' 
  }
}));

// 2. Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Swagger Routes
app.use(swaggerRoutes);

// Routes will be mounted here
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/tracks", trackRoutes);

// Authorization Routes 
app.use("/", authRoutes);

// Home route
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const name = req.user.displayName || req.user.username || req.user.login;
    res.send(`Logged in as ${name}`);
  } else {
    res.send("Logged out. Please go to /login to authenticate.");
  }
});

// Handling Undefined Routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
