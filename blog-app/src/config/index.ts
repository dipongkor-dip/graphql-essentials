import "dotenv/config";

const config = {
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "signature",
};

export default config;
