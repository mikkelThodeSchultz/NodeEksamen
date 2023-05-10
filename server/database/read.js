import db from "./connection.js";

const founderUsers = await db.users.find({}).toArray();
console.log(founderUsers);