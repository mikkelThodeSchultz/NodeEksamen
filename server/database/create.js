import { Admin } from "mongodb";
import db from "./connection.js";


const createAdam = await db.users.insertOne({userName: "Adam", email: "AdamsEmail", password: "AdamsPassword", role: "Admin"})
const createMik = await db.users.insertOne({userName: "Mik", email: "MiksEmail", password: "MiksPassword", role: "User"})
const createKev = await db.users.insertOne({userName: "Kev", email: "KevosEmail", password: "KevosPassword", role: "User"})