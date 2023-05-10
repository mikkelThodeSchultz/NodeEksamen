import db from "./connection.js"
import bcrypt from "bcrypt";

console.log("TEST");

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode){
    db.database.dropDatabase();
}
const AdamPassword = await bcrypt.hash("a123", 12);
const MikPassword = await bcrypt.hash("m123", 12);
const KevPassword = await bcrypt.hash("k123", 12);

const createAdam = {userName: "Adam", email: "AdamsEmail", password: AdamPassword, role: "Admin"};
const createMik = {userName: "Mik", email: "michaelthodeschultz@gmail.com", password: MikPassword, role: "User"};
const createKev = {userName: "Kev", email: "KevosEmail", password: KevPassword, role: "User"};

const createUser = await db.users.insertMany([
    createAdam, createMik, createKev
]);
