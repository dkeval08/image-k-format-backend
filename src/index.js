import express from "express";
import mediaRoutes from "./routes/media.route.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { config as configDotenv } from "dotenv";
configDotenv();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Root route
app.get("/", (req, res) => {
  return res.send("Welcome to ImageKFormat");
});

app.use("/api/users", userRoutes);
app.use("/api/media", mediaRoutes);

app.listen(PORT, () =>
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
);
