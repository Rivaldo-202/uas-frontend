import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

declare global {
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

export default async function connectDB() {
  if (global.mongooseConnection) {
    return global.mongooseConnection;
  }

  global.mongooseConnection = mongoose
    .connect(MONGODB_URI)
    .then((conn) => {
      console.log("✅ MongoDB Connected");
      return conn;
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });

  return global.mongooseConnection;
}
