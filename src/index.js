import bodyParser from "body-parser";
import fs from "fs";
import "@babel/polyfill";
import express from 'express'; // framework, yo
// import cheerio from 'cheerio'; // IM TRYING JSOM MOM
import jsdom from "jsdom";
const { JSDOM } = jsdom;

import axios from "axios";
if (process.platform === "darwin") { require("dotenv").config() } // enterprise-grade MacOS-detection
const app = express() // express app instance
app.set('view engine', 'ejs')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));  // to support URL-encoded bodies 
// app.use(express.static(__dirname + '/public')); // because paths is a PITA
// app.use(express.static("public")); // because paths is a PITA
// @ts-ignore
// const APIS = JSON.parse(fs.readFileSync("./build/apis.json", "utf8"))
const getAPIS = () => (fs.readFileSync("./build/apis.json", "utf8"))




//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // Remember to have apikey here, else our enterprise-grade authorization-system will fail
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Cache-Control, Accept, apikey");
    next();
});


// MICKEY MOUSE ENTERPRISE-GRADE SECURITY AS A SERVICE
const superSecretApiKeys = process.env.APIKEYS.split(",")
const doEnterpriseLevelSecurityCheck = true;
// ENTERPRISE GRADE RANDOMIZATION ENGINE
const randomize = (min, max) => Math.round((Math.random() * (max - min) + min))

app.get('/tihi', (req, res) => { res.redirect("https://www.youtube.com/watch?v=-Lez_WdX7Oc") })// TIHIaaS -  Thanks, I hate it as a Service
app.get("/version", (req, res) => { res.json({ version: "1.0.0" }) })// version
app.get('/doh', (req, res) => { res.json({ message: "D'oh!" }) }) // DaaS - D´oh! as a Service


// GET a named API by title or whatever
app.get('/get', (req, res) => {
    if (!req.query.name) { res.json(JSON.parse(getAPIS())) } // yeah so no query, you get all, you fool! use /LIST
}) // D'oh!



// list all created apis
app.get("/list", (req, res) => res.json(JSON.parse(getAPIS())))
app.get("/success", (req, res) => res.render("success")) // newform
app.get(["/new", "/create"], (req, res) => res.render("new")) // newform
// postbacks go here. it's so damn secure
app.post(["/new", "/create"], (req, res) => {
    console.log(JSON.stringify(req.body))
    let apiname = req.body.name || "[YOUR_API_NAME]"
    let apiFile = fs.readFileSync("./build/apis.json", "utf8")
    let apiFileReadyForNewEntry = apiFile.substring(0, apiFile.length - 1)
    fs.writeFile("./build/apis.json", `\n${apiFileReadyForNewEntry},\n${JSON.stringify(req.body)}]`, ((err, data) => { // ITS FUCKING GLORIOUS
        if (err) {
            res.render("error")
        } else {
            res.send(`
            <!DOCTYPE html>
<html>

<head>
    <title>Shitty APIs as a Service</title>
    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:creator" content="@Kimzter">
    <meta name="og:title" content="Shitty APIs as a Service">
    <script src="//code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
</head>

<body>
    <div class="container">
        <div class="hero-unit">
            <h1>Congratulations on your new shitty API!</h1>
            <h2>Shitty APIs as a Service</h2>
            <p><em>v1.0.0</em></p>
        </div>
    </div>
    <div class="container">
        <div class="content" style="margin-left:50px;">
            <h2 id="introduction">Your newly created api is accessible at <a href="http://saaas.puzzlebart.no/${apiname}">http://saaas.puzzlebart.no/${apiname}</a></h2>
        </div>
    </div>
</body>

</html>
            `);
        }
    }))
})



//Do lol stuff here with cheerio
async function executeAPI(req, res) {
    console.log(`----------- EXECUTEAPI ${req.url.substring(1)} -----------`)
    let allShittyAPIs = JSON.parse(getAPIS());
    let apiName = req.url.substring(1);
    // if (apiName.indexOf("?")) { apiName = apiName.substring(0, apiName.indexOf("?")) } // HAHAHA SO BAD
    console.log(`api definitions: ${JSON.stringify(allShittyAPIs)}`)
    let shittyApiDefinition = allShittyAPIs.filter((a) =>{
        console.log(`testing ${a.name} equal to ${apiName}`)
         return a.name == apiName})[0]; // we already know it exists 'cause we checked right
    console.log(`Found an api definition: ${JSON.stringify(shittyApiDefinition)}`)
    if (!shittyApiDefinition) {
        console.log("no shitty api definition...")
        res.render("error")
    }
    console.log(`THIS IS THE SHITTY API DEFINITION T.I.H.I.`)
    console.log(JSON.stringify(shittyApiDefinition))
    const url = shittyApiDefinition.url;
    axios.get(url).then(r => {
        const data = r.data
        const dom = new JSDOM(data)
        let document = dom.window.document; // ah it's so familiar

        // ----------------- THIS IS WHERE ALL THE SHITTY MAGIC HAPPENS ---------------------------------------------------

        console.log(`SELECTORS: ${shittyApiDefinition.selectors}`)
        let allTheThings = document.querySelectorAll(shittyApiDefinition.selectors);
        if (allTheThings.length) {
            let allTheShittyEntries = [...allTheThings].map(e => { return { entry: e.textContent.trim() } })
            // console.log(allTheShittyEntries)
            res.json(allTheShittyEntries)
        } else {
            res.json({ message: "no entries in your shitty api" })
        }
    })
}

// ENTERPRISE LEVEL SECURITY ENGINE AUTOMATRON - DO NOT TOUCH IT'S PERFECT THANKS
function EnterpriseLevelSecurityCheck(req, res) {
    return new Promise((resolve, reject) => {
        if (!doEnterpriseLevelSecurityCheck || req.get('host').indexOf("localhost") > -1) { resolve(true); return; }
        if (!req.headers.apikey && !req.query.apikey) {
            res.json({ error: `NO API KEY SPECIFIED. ASK PUZZLEBART FOR ONE! We're all about sharing :D` })
            resolve(false)
        } else {
            if (superSecretApiKeys.includes(req.headers.apikey) || superSecretApiKeys.includes(req.query.apikey)) { resolve(true) } else {
                res.json({ error: `WRONG API KEY SPECIFIED - ARE YOU HACKING???!` })
                resolve(false)
            }
        }
    })
}
// END SECURITIFICATION


// Stupid sexy jslint
const capitalize = (s) => { if (typeof s !== 'string') return ''; return s.charAt(0).toUpperCase() + s.slice(1) }

// NOT IMPLEMENTED
app.get("/501", (req, res) => { res.status(501); res.render("error") })

// FRONT PAGE
app.get('/', (req, res) => { res.render("index") });

app.get("/favicon.ico", (req, res) => {
    res.end()
})

// error route
app.get('(/*)?', (req, res) => {
    let allShittyApiNames = JSON.parse(getAPIS()).map(a => `${a.name}`)
    let apiName = req.url.substring(1).trim();
    console.log(`TESTING FOR: ${apiName}`)
    console.log(`AVAILABLE APIS: ${allShittyApiNames}`)
    if (apiName.indexOf("?") > -1) { apiName = apiName.substring(0, apiName.indexOf("?")) }
    let matches = allShittyApiNames.filter(a => a.name == apiName);
    if (matches) { executeAPI(req, res) } else {
        console.log(`no match for ${apiName}`)
        res.render(`error`)
    }
}) // D'oh!

app.listen(process.env.PORT || '3000', () => console.log(`running on port ${process.env.PORT || '3000'}`))