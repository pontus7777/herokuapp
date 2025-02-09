import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "./auth/passport";
import { CONFIG } from "./config/enviroment";
import mongoDbRoutes from "./routes/mongoDbRoutes";
import openDotaRoutes from "./routes/openDotaRoutes";
import steamRoutes from "./routes/steamRoutes";
import { setupSwagger } from "./swagger";
import path from "path";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/steam", steamRoutes);
app.use("/api/v1/", openDotaRoutes);
app.use("/api/v1/", mongoDbRoutes);

app.use(express.static(path.join("../frontend/dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("../frontend/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Swagger documentation
setupSwagger(app);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${CONFIG.PORT}`);
  console.log(`API docs available at http://localhost:${CONFIG.PORT}/api-docs`);
});

export { server };
export default app;
