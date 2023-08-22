import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// Defining the configuration object
const config = {
  env: process.env.NODE_ENV, // Environment mode (development, production, etc.)
  port: process.env.PORT, // Port number for the server
  database_url: process.env.DATABASE_URL, // URL for the database
  default_employee_pass: process.env.DEFAULT_EMPLOYEE_PASS,
  jwt_secret: process.env.JWT_ACCESS_TOKEN,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
  },
};

export default config;
