import dotenv from "dotenv/config";
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
await client.connect();

const db = client.db("Dybdestegte");

export default{
  database: db,
  users: db.collection("users"),
  bands: db.collection("bands"),
  resetCollection: db.collection("resetCollection")
}