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

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use(session({
  secret: 'un-secreto-muy-seguro',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    httpOnly: true,
    sameSite: 'lax' 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(swaggerRoutes);

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/tracks", trackRoutes);

app.use("/", authRoutes);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    const name = req.user.displayName || req.user.username || req.user.login;
    res.send(`Logged in as ${name}`);
  } else {
    res.send("Logged out. Please go to /login to authenticate.");
  }
});

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
