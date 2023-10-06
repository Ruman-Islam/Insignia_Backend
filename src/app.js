import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import routes from "./app/routes/index.js";

// Create an instance of the Express application
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "x-auth-token", "authorization"],
};

// Application Middleware
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(cookieParser());
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Application Routes
app.use("/api/v1", routes);

app.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send("Welcome to Insignia Tours & Travels production!!");
});

// Handle not found
app.use((req, res) => {
  // Return a JSON response with the appropriate status code and error message
  return res.status(400).json({
    success: false,
    message: "API not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
});

// Global Error Handler
// Middleware to handle errors globally and send standardized error responses
app.use(globalErrorHandler);

export default app;
