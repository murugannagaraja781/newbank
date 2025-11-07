import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";

dotenv.config();
connectDB();

const app = express();

// parse JSON request bodies
app.use(express.json());

// ---- CORS configuration (needed for React frontend) ----
const corsOptions = {
  origin: "http://localhost:3000", // React dev server URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// apply to all routes
app.use(cors(corsOptions));
// handle browser pre-flight requests safely under Node 22+
app.options(/.*/, cors(corsOptions));
// ---------------------------------------------------------

app.get("/", (_, res) => res.send("MyBank API Running"));

app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/transfer", transferRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
