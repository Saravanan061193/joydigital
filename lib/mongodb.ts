import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  // Don't crash at build time if MONGODB_URI is not set.
  // Instead, throw error at run time when a request actually tries to connect.
  console.warn("WARNING: MONGODB_URI environment variable is not defined.");
}

const uri = process.env.MONGODB_URI || "";
const options = {
  serverSelectionTimeoutMS: 2500,
  connectTimeoutMS: 2500,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  clientPromise = Promise.reject(new Error("MONGODB_URI is not defined. Please add it to your environment variables."));
}

export default clientPromise;

export async function getDb(dbName = "joydigital") {
  const client = await clientPromise;
  return client.db(dbName);
}
