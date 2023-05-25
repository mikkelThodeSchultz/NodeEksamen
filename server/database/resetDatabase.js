import db from "./connection.js"
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode){
    db.database.dropDatabase();
}
const AdminPassword = await bcrypt.hash("a", 12)
const AdamPassword = await bcrypt.hash("a123", 12);
const MikPassword = await bcrypt.hash("m123", 12);
const KevPassword = await bcrypt.hash("k123", 12);

const createAdmin = {userName: "Admin", email: "a@a", password: AdminPassword, role: "Admin"};
const createAdam = {userName: "Adam", email: "AdamsEmail", password: AdamPassword, role: "Admin"};
const createMik = {userName: "Mik", email: "michaelthodeschultz@gmail.com", password: MikPassword, role: "User"};
const createKev = {userName: "Kev", email: "KevosEmail", password: KevPassword, role: "User"};

const shrugDemo1 = {
    artist: "Shrug",
    albumTitle: "Demo I",
    releaseDate: "January 29, 2023",
    embedLink: `<iframe style="border: 0; width: 350px; height: 622px;" src="https://bandcamp.com/EmbeddedPlayer/album=2276781933/size=large/bgcol=333333/linkcol=e99708/package=1797137217/transparent=true/" seamless><a href="https://dybdestegte.bandcamp.com/album/demo-i">Demo I by Shrug</a></iframe>`,
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
    embedLink: `<iframe style="border: 0; width: 350px; height: 655px;" src="https://bandcamp.com/EmbeddedPlayer/album=3556587808/size=large/bgcol=333333/linkcol=e99708/package=3653272819/transparent=true/" seamless><a href="https://dybdestegte.bandcamp.com/album/svag-total">SVAG TOTAL by JESUM CHRISTUM</a></iframe>`,
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

const comment1 = {
    userName: "navn på person der har skrevet",
    timeStamp: "dato: d. 13-12-23",
    comment: "Det her er en kommentar om hvor fedt jeg syntes det her band her!!"
}
const comment2 = {
    userName: "En anden person der har skrevet",
    timeStamp: "dato: d. 23-12-22",
    comment: "Det her band sutter!"
}

const show1 = {
    title: "Roskilde Festival 2023 - Mr. Jones åbner Orange",
    date: "d. 25-06-23",
    location: "Roskilde",
    description: "Mr. Jones kommer og åbner op for Roskilde festival, med sit trofaste crew og den gode stemning",
    image: "linktilbillede",
    event: "linktilevent",
}
const show2 = {
    title: "Copenhell 2024 - SHRUG LAVE DØD OG ØDELÆGGELSE PÅ DEN STORE SCENE",
    date: "d. 24-12-24",
    location: "Ræffen",
    description: "SHRUG ER MEGET BEDRE END METALLICA, HAN KOMMER OG FORTÆLLER DIG DET",
    image: "linktilbillede",
    event: "linktilevent"
}

const createShow = await db.show.insertMany([show1, show2]);

const createMusic = await db.music.insertMany([
    shrugDemo1, JCsvagTotal
]);
const createResetCollection = await db.resetCollection.insertOne({userID: "testUserID", resetCode: "ABC123", expirationDate: "13-12-23"});
const createUsers = await db.users.insertMany([
    createAdam, createMik, createKev, createAdmin
]);
