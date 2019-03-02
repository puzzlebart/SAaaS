// @ts-ignore
import APIS from "./apis.json";
import "@babel/polyfill";
import express from 'express'; // framework, yo
// import cheerio from 'cheerio'; // IM TRYING JSOM MOM
import jsdom from "jsdom";
const { JSDOM } = jsdom;

import axios from "axios";
if (process.platform === "darwin") { require("dotenv").config() } // enterprise-grade MacOS-detection
const app = express() // express app instance
app.set('view engine', 'ejs')




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
app.get('/get', (req, res) => { res.status(501); res.render("error") }) // D'oh!

// list all created apis
app.get("/list", (req, res) => res.json(APIS))


//Do lol stuff here with cheerio
async function executeAPI(req, res) {
    console.log(`EXECUTEAPI ${req.url.substring(1)}`)
    let apiName = req.url.substring(1).trim();
    let shittyApiDefinition = APIS.filter(a => a.name === apiName)[0] // we already know it exists 'cause we checked right
    console.log(`THIS IS THE SHITTY API DEFINITION T.I.H.I.`)
    console.log(JSON.stringify(shittyApiDefinition))
    const url = shittyApiDefinition.url;
    axios.get(url).then(r => {
        const data = r.data
        const dom = new JSDOM(data)
        let document = dom.window.document; // ah it's so familiar

        // THIS IS WHERE ALL THE SHITTY MAGIC HAPPENS

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
            let matches = APIS.filter(api => {
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


// FRONT PAGE
app.get('/', (req, res) => { res.render("index") });

const matchesAnAPI = (apiName) => {
    console.log(`checking whether the "${apiName}" api exists`)
    let matches = APIS.filter(a => a.name === apiName).length == 1
    console.log(`api-match: ${matches}`)
    return matches
}

// error route
app.get('(/*)?', (req, res) => matchesAnAPI(req.url.substring(1)) ? executeAPI(req, res) : res.render(`error`)) // D'oh!

app.listen(process.env.PORT || '3000', () => console.log(`running on port ${process.env.PORT || '3000'}`))