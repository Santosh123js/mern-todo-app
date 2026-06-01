import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;

const dbName = "node-project";
export const collectionName = "todo";
const client = new MongoClient(url);
export const connection = async () => {
  const connect = await client.connect();

  console.log("MongoDB Connected");

  return connect.db(dbName);
};

