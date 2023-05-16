import dotenv from "dotenv/config";
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
await client.connect();

const db = client.db("Dybdestegte");

export default{
  database: db,
  users: db.collection("users"),
  music: db.collection("music"),
  shows: db.collection("shows"),
  comments: db.collection("comments"),
  chatMessages: db.collection("chatMessages"),
  resetCollection: db.collection("resetCollection")
}