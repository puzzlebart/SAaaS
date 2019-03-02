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
const getAPIS = () => JSON.parse(fs.readFileSync("./build/apis.json", "utf8"))




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
    if (!req.query.name) { res.json(getAPIS()) } // yeah so no query, you get all, you fool! use /LIST
}) // D'oh!



// list all created apis
app.get("/list", (req, res) => res.json(getAPIS()))
app.get("/success", (req, res) => res.render("success")) // newform
app.get(["/new", "/create"], (req, res) => res.render("new")) // newform
// postbacks go here. it's so damn secure
app.post(["/new", "/create"], (req, res) => {
    console.log(JSON.stringify(req.body))
    let apiFile = fs.readFileSync("./build/apis.json", "utf8")
    let apiFileReadyForNewEntry = apiFile.substring(0, apiFile.length - 1)
    fs.writeFile("./build/apis.json", `\n${apiFileReadyForNewEntry},\n${JSON.stringify(req.body)}]`, ((err, data) => { // ITS FUCKING GLORIOUS
        if (err) {
            res.render("error")
        } else {
            res.render("success");
        }
    }))
})



//Do lol stuff here with cheerio
async function executeAPI(req, res) {
    console.log(`----------- EXECUTEAPI ${req.url.substring(1)} -----------`)
    let allShittyAPIs = getAPIS();
    let apiName = req.url.substring(1).trim();
    if (apiName.indexOf("?")) { apiName = apiName.substring(0, apiName.indexOf("?")) } // HAHAHA SO BAD
    console.log(`api definitions: ${JSON.stringify(allShittyAPIs)}`)
    let shittyApiDefinition = await allShittyAPIs.filter(async (a) => a.name == apiName)[0]; // we already know it exists 'cause we checked right
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


// SEARCH FUNCTION YEAOIAUSODIUASDOIS
let search = app.get(["/search", "/find"], (req, res) => {
    EnterpriseLevelSecurityCheck(req, res).then(passed => {
        let q = req.query.q;
        if (!q) res.json({ error: "no query specified. use ?q=[querystring]" })
        if (q.length < 1) { res.json({ message: "type at least two characters to search" }) } else {
            q = decodeURIComponent(q.toLowerCase());
            let matches = getAPIS().filter(api => {
                let name = api.name ? api.name.toLowerCase() : "";
                return name.indexOf(q) > -1
            })
            res.json(matches.length ? matches : { message: "no shitty API matches :'-(" })
        }
    })
})

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

// SHITTY API ENDPOINT TRIGGER 
app.get([...getAPIS().map(a => `/${a.name}`)], (req, res) => {
    EnterpriseLevelSecurityCheck(req, res)
        .then(passed => {
            passed ? executeAPI(req, res) : res.render("error")
        })
})

// error route
app.get('(/*)?', (req, res) => res.render(`error`)) // D'oh!

app.listen(process.env.PORT || '3000', () => console.log(`running on port ${process.env.PORT || '3000'}`))