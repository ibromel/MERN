import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/bd.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
if (!process.env.MONGO_URI) {
  console.error("Erreur: MONGO_URI manquant dans le fichier .env");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("Erreur: JWT_SECRET manquant dans le fichier .env");
  process.exit(1);
}
const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" })
);
app.use(express.json());
app.use("/api/users", userRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
  console.log('MONGO_URI used:', process.env.MONGO_URI?.substring(0, 40));
});
    
