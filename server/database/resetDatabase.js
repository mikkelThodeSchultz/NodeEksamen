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
    description: "Shrug er kommet for at dominere dig og din verden",
    embedLink: `<iframe style="border: 0; width: 350px; height: 622px;" src="https://bandcamp.com/EmbeddedPlayer/album=2276781933/size=large/bgcol=333333/linkcol=e99708/package=1797137217/transparent=true/" seamless><a href="https://dybdestegte.bandcamp.com/album/demo-i">Demo I by Shrug</a></iframe>`,
}
const JCsvagTotal = {
    artist: "JESUM CHRISTUM",
    albumTitle: "SVAG TOTAL",
    releaseDate: "February 24, 2023",
    description: "JC er kommet for at dominere dig og din verden",
    embedLink: `<iframe style="border: 0; width: 350px; height: 655px;" src="https://bandcamp.com/EmbeddedPlayer/album=3556587808/size=large/bgcol=333333/linkcol=e99708/package=3653272819/transparent=true/" seamless><a href="https://dybdestegte.bandcamp.com/album/svag-total">SVAG TOTAL by JESUM CHRISTUM</a></iframe>`,
}

const show1 = {
    title: "Dybdestegte pt. II",
    date: "d. 20-12-19",
    location: "Christianshavn Beboerhus",
    description: "Endnu en historisk aften i dybdens navn. I denne omgang, fire velhavende doggs: GHAZAL, KAMP, DILLIAN HARPER, COLLIDER. Christianshavns Beboerhus bliver aftenens grotte og kun 30 knogleben skal du af med, for at være med. GLÆDELIG JUL",
    image: "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/christianshavn+beboerhus.jpg",
    event: "https://www.facebook.com/events/774027259683964",
}
const show2 = {
    title: "Klub Parvenu",
    date: "d. 24-02-23",
    location: "Christianshavn Beboerhus",
    description: `MR. JONES Ancient empires once cast long shadows over a world that quaked beneath his feet. Taking glee in suffering and death, the sadistic Mr. Jones is always on the hunt for prey. His sweet song has lured countless adventurers to their deaths, drawing them in close for him to kill and then consume. Old as Legend. REX KYED er et eksperimentelt, industrielt og elektronisk lydbillede og præsenterer denne aften overvejende nyt material, som er en del af det næste album. Sammen spillede Peter Kyed og Anders Rex hypnotisk krautrock i Svartbag , glam/punk/PP-music i The Bleeder Group og udgav i 2018 deres superroste dark-ambeint projekt REX KYED på Infinite Waves. Deres koncert med The Young Gods fik disse ord med på vejen i ”Undertoner”. ”De (REX KYED) stillede sig op med hver deres synthesizer, placeret næsten som to centre i et imaginært liggende otte-tal, symbolet på uendeligheden og fremmanede netop dén; uendeligheden. Manede den op af undergrunden i et støvet shamanistisk lydbillede, et rituelt renselsesbad af lyd, der gjorde rigtig godt...” (Jens Trapp, Undertoner.dk , 9. december 2019) Link til album anmeldelse i Passiv/Aggresiv: https://passiveaggressive.dk/rex-kyed-transithallernes.../ REX KYED på facebook: https://www.facebook.com/REXKYED REX KYED PÅ YouTube: https://www.youtube.com/watch?v=6wiCbeE_S4Y LEIZURE "De unge københavnske post-punkere skriver sange, der slår pusten ud af dig, og deres kompromisløse æstetik eksploderer på en scene. Koket og dyrisk, ejer frontmand Sanderson salen – det ene øjeblik crooner han sig blidt ind i dit hjerte, og det næste flår han det ud af dit bryst og brøler mod himlen. I efteråret 2020 udkom debutalbummet ‘Primal Hymns’, som musikmagasinet GAFFA kaldte årets bedste, danske post-punk udgivelse og gav fem flotte stjerner”. Senest har Leizure opvarmet for det australske band Crime and The City Solution på Posten og i Beta hvor musikmagasinet Concert Addicts skrev om dem: "Both nights were opened by Copenhagen-based no-wave band Leizure, who played a blistering set obviously influenced by bands like The Birthday Party, Sonic Youth, and Swans, with the interplay of singer Zakarias Sanderson and saxophonist Arshia Kadkhodaei as a highlight" Deres andet fuldlængde album er undervejs, og man kan allerede nu få en forsmag på pladen med singlen "Heaven and back again". Link til anmeldelse af primal hymns: https://gaffa.dk/.../2021/februar/album/postpunk-med-trut-i/ (dj) Kristoffer Bech fra Shiny Darkly er endelig tilbage efter en pause fra hans fallerede dj karriere, og vil med oprejst sjæl, og med sin utilregnelige musiksmag, denne aften prøve at skabe stemningen af at være en efterladt blind hund der løber i cirkler til lyden af kanonslag i en forladt herskabslejlighed, og hvor pladespilleren samtidig er gået i hak til ‘i did it my way’.  Artwork af: Mathias Gørtz`,
    image: "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/christianshavn+beboerhus2.jpg",
    event: "https://fb.me/e/3iETWoZGe"
}
const show3 = {
    title: "Springer Release + Young Smash OTP - Dillian Harper",
    date: "d.26-06-21",
    location: "Stengade",
    description: 
    `OBS // VI forventer restriktioner til den tid så der er meget begrænset antal billetter til salg og showet forventes at afholdes som siddende arrangement. vi sælger ikke billetter i døren // OBS
    Springer:
    Det spirende danske stjernefrø Springer er tilbage på scenen på Stengade.
    På Springers første EP, Bad Choice, fik han ikke alene blændende anmeldelser – singlen Protection strøg også direkte ind som P3’s Uundgåelige, mens sangen Isn’t it Obvious lå i heftig rotation på P3.
    Springer har allerede taget hul på en ny fase med Ronni Vindahl i producerstolen, hvor sangen Tell Me var første udspil på den opfølgende EP til Bad Choice.
    Bag Springer står den 25-årige Jakob Emil Lamdahl, der har begået sig i musikkens verden, siden han var 17 år gammel og flyttede til København fra den fædrene jyske svinefarm. Springer er inkarnationen af rock med trap og hiphop i ascendanten. Han har spillet i undergrundsbands som Værket, Gäy og Elias Rønnenfeldts (Ice Age) sideprojekt Marching Church – her på trompet. Med sidstnævnte har han også tourneret USA tyndt. Siden da har Springer taget solo-springet, og har de sidste år arbejdet på at fusionere de genrer, der måske umiddelbart ikke har meget til fælles med hinanden.
    + Support:
    Young Smash OTP
    Dillan Harper
    --------------------------------------------
    Entré: 130 kr (inkl. gebyr) / Intet dørsalg (afhænger af restriktioner)
    Forsalg: https://bit.ly/2SK2DLq`,
    image: "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/stengade.png",
    event: "https://www.facebook.com/events/606657517392848/?acontext=%7B%22ref%22%3A%2252%22%2C%22action_history%22%3A%22[%7B%5C%22surface%5C%22%3A%5C%22share_link%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22share_link%5C%22%2C%5C%22extra_data%5C%22%3A%7B%5C%22invite_link_id%5C%22%3A245313660700645%7D%7D]%22%7D"
}
const show4 = {
    title: "Gong Farmer // Roma Bahn // Bror // Dillian Harper",
    date: "07-09-19",
    location: "Børneteatret",
    description: `Para og Dybtestegte Bookings præsenterer en værre rockaften:
    GONG FARMER = rockmusik
    ROMA BAHN = rockmusik
    BROR = rockmusik
    DILLIAN HARPER = rockmusik
    Entré: 30,-
    Dør: 20.00
    Koncert: 21.00`,
    image: "https://dybdestegte-bucket.s3.eu-north-1.amazonaws.com/b%C3%B8rneteatret.jpg",
    event: "https://www.facebook.com/events/340749626879948/?acontext=%7B%22ref%22%3A%2252%22%2C%22action_history%22%3A%22[%7B%5C%22surface%5C%22%3A%5C%22share_link%5C%22%2C%5C%22mechanism%5C%22%3A%5C%22share_link%5C%22%2C%5C%22extra_data%5C%22%3A%7B%5C%22invite_link_id%5C%22%3A1177709576145169%7D%7D]%22%7D"
}

const createShow = await db.show.insertMany([show4, show1, show3, show2]);

const createMusic = await db.music.insertMany([
    shrugDemo1, JCsvagTotal
]);
const createResetCollection = await db.resetCollection.insertOne({userID: "testUserID", resetCode: "ABC123", expirationDate: "13-12-23"});
const createUsers = await db.users.insertMany([
    createAdam, createMik, createKev, createAdmin
]);
