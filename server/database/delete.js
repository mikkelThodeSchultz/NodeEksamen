import db from "./connection.js"




db.users.deleteOne({navn: "Adam"});