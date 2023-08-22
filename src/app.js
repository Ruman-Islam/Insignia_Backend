import cors from "cors";
import express from "express";
import httpStatus from "http-status";

// Create an instance of the Express application
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "x-auth-token"],
};

// Application Middleware
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: "50mb" })); // Parse JSON request bodies
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
); // Parse URL-encoded request bodies

app.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.status(200).json({
    message: "Welcome to Insignia Tours & Travels production!!",
  });
});

// Handle not found
app.use((req, res) => {
  // Return a JSON response with the appropriate status code and error message
  return res.status(httpStatus.NOT_FOUND).json({
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

export default app;
