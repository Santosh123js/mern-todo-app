import dotenv from "dotenv";

dotenv.config();

import { ObjectId } from "mongodb";
import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: "5d" },
        (error, token) => {
          res.send({
            success: true,
            message: "User registered successfully",
            token,
          });
        },
      );
    }
  } else {
    res.send({
      success: false,
      message: "Please provide valid email and password",
    });
  }
});

app.post("/login", async (req, resp) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (result) {
      jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: "5d" },
        (error, token) => {
          resp.send({
            success: true,
            msg: "login done",
            token,
          });
        },
      );
    } else {
      resp.send({
        success: false,
        msg: "User not found",
      });
    }
  } else {
    resp.send({
      success: false,
      msg: "login not done",
    });
  }
});

// CREATE TASK API
app.post("/add-task", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(req.body);
  res.send({
    message: "Task added successfully",
    success: true,
    result,
  });
});

// GET ALL TASKS API
app.get("/tasks", verifyJWTToken, async (req, res) => {
  const db = await connection();
  console.log("cookies test", req.cookies["token"]);
  const collection = await db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({
      success: true,
      message: "Task list fetched successfully",
      result,
    });
  } else {
    res.send({
      success: false,
      message: "error fetching task list",
    });
  }
});

app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({
      success: true,
      message: "Task deleted successfully",
      result,
    });
  } else {
    res.send({
      success: false,
      message: "Failed to delete task",
    });
  }
});

app.put("/update-task", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  console.log(fields);
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
  if (result) {
    res.send({
      success: true,
      message: "Task data updated ",
      result,
    });
  } else {
    res.send({
      success: false,
      message: "error try after sometime ",
    });
  }
});

app.get("/task/:id", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({
      success: true,
      message: "Task  fetched successfully",
      result,
    });
  } else {
    res.send({
      success: false,
      message: "error fetching task list",
    });
  }
});

app.delete("/delete-multiple", verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const Ids = req.body;
  const deleteTaskIds = Ids.map((item) => new ObjectId(item));
  console.log(Ids);

  const collection = await db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });
  if (result) {
    resp.send({ message: "task deleted ", success: result });
  } else {
    resp.send({ message: "error try after sometime", success: false });
  }
});

// HOME API
app.get("/", (req, res) => {
  res.send({
    message: "api is created",
    success: true,
  });
});

function verifyJWTToken(req, res, next) {
  // console.log("verifyJWTToken", req.cookies["token"]);
  const token = req.cookies["token"];
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.send({
        success: false,
        message: "Invalid token",
      });
    }
    console.log(decoded);
    next();
  });
}

// SERVER
const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
