import db from "./connection.js";

db.users.updateOne({navn: "Adam"}, {$set: {name: "MikeT"}});