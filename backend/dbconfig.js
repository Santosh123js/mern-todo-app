import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;

console.log("URL:", process.env.MONGO_URI);

const dbName = "node-project";
export const collectionName = "todo";
const client = new MongoClient(url);
export const connection = async () => {
  const connect = await client.connect();

  console.log("MongoDB Connected");

  return connect.db(dbName);
};

// import { MongoClient } from "mongodb";

// const url =
// "mongodb://jaiswalsantosh2424_db_user:santosh12345@ac-smtsv0a-shard-00-00.9trlgnt.mongodb.net:27017,ac-smtsv0a-shard-00-01.9trlgnt.mongodb.net:27017,ac-smtsv0a-shard-00-02.9trlgnt.mongodb.net:27017/node-project?ssl=true&replicaSet=atlas-9qgh3a-shard-0&authSource=admin&retryWrites=true&w=majority";

// const dbName = "node-project";

// export const collectionName = "todo";

// const client = new MongoClient(url);

// export const connection = async () => {

//   try {

//     const connect = await client.connect();

//     console.log("MongoDB Connected");

//     return connect.db(dbName);

//   } catch (error) {

//     console.log("MongoDB Error:", error);

//   }

// };
