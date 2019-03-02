// @ts-ignore
import APIS from "./apis.json";
import express from 'express'; // framework, yo
import cheerio from 'cheerio';
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


app.get('/get', (req, res) => {

}) // D'oh!


// list all created apis
let list = app.get("/list", (req, res) => {
    res.json(APIS)
})


//Do lol stuff here with cheerio
function executeAPI(req, res, api) {
    let apiName = req.url.substring(1);
    let shittyApi = APIS.filter(a => a.name === apiName) // we already know it exists 'cause we checked right
    const url = shittyApi.url;
    const getData = async url => {
        try {
            console.log(`trying to fetch ${shittyApi.url}`)
            const response = await axios.get(url);
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    let data = getData(url);
    if (data)
        res.send(data)
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

function matchesAnAPI(apiName) {
    console.log(`checking whether the "${apiName}" api exists`)
    let matches = APIS.filter(a => a.name === apiName).length == 1
    console.log(`api-match: ${matches}`)
    return matches
}

// error route
app.get('(/*)?', (req, res) => {
    if (matchesAnAPI(req.url.substring(1))) {
        executeAPI(req, res)
    } else {
        res.send(`
<html>
<head>
    <title>Simpsons as a Service</title>
    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">
    <meta name="og:title" content="Simpsons As A Service">
    <script src="//code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
</head>
<body>
    <div class="container">
        <div class="hero-unit">
            <h1>742 - D'oh!</h1>
            <h2>This is not the shitty API you are looking for</h2>
            <p><em>Shitty API as a Service v1.0.0</em></p>
        </div>
    </div>
    <center><a href="/">saas.puzzlebart.no</a>
    </body></html>`)
    }
}) // D'oh!

app.listen(process.env.PORT || '3000', () => console.log(`running on port ${process.env.PORT || '3000'}`))