import db from "./connection.js"
import bcrypt from "bcrypt";

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

const shrugDemo1 = {
    artist: "Shrug",
    albumTitle: "Demo I",
    releaseDate: "January 29, 2023",
    image: "linkTilBilledeHer",
    songs: [
        {
            title: "Next to You",
            lenght: "07:28"
        }, 
        {
            title: "Why'd You Stay?",
            lenght: "06:38"    
        }, 
        {
            title: "I'll Implode",
            lenght: "09:21"
        }
    ]
}
const JCsvagTotal = {
    artist: "JESUM CHRISTUM",
    albumTitle: "SVAG TOTAL",
    releaseDate: "February 24, 2023",
    image: "linkTilBilledeHer",
    songs: [
        {
            title: "SLIP",
            length: "08:44"
        },
        {
            title: "DRÆNET PÅ UVIST TID",
            length: "11:10"
        },
        {
            title: "PAUSE FRA EKSISTENS",
            length: "06:22"
        },
        {
            title: "HERSKER",
            lenght: "06:15"
        }
    ]
}


const createResetCollection = await db.resetCollection.insertOne({userID: "testUserID", resetCode: "ABC123", expirationDate: "13-12-23"});

const createUsers = await db.users.insertMany([
    createAdam, createMik, createKev
]);




// users: db.collection("users"),
// bands: db.collection("music"),
// shows: db.collection("shows"),
// comments: db.collection("comments"),
// resetCollection: db.collection("resetCollection")