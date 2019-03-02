// @ts-ignore
import express from 'express'; // framework, yo
if (process.platform === "darwin") { require("dotenv").config() } // enterprise-grade MacOS-detection
const app = express() // express app instance




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

// TIHIaaS -  Thanks, I hate it as a Service
let tihi = app.get('/tihi', (req, res) => { res.redirect("https://www.youtube.com/watch?v=-Lez_WdX7Oc") })

// version
let version = app.get("/version", (req, res) => { res.json({ version: "1.0.0" }) })

// DaaS - D´oh! as a Service
let doh = app.get('/doh', (req, res) => { res.json({ message: "D'oh!" }) }) // D'oh!

let quotes = app.get('/quotes', (req, res) => {
    EnterpriseLevelSecurityCheck(req, res).then(passed => { // VERY IMPORTANT SECURITY STUUFF
        let charsWithQuotes = SaaSData.filter(char => char.Quotes.length >= 1)
        const getRandomChar = () => charsWithQuotes[randomize(0, charsWithQuotes.length - 1)]
        const getRandomQuote = (char) => char.Quotes.length === 1 ? char.Quotes[0] : char.Quotes[randomize(0, char.Quotes.length - 1)];
        const getRandomQuoteObject = () => {
            let rChar = getRandomChar()
            let rQuote = getRandomQuote(rChar)
            return { Quote: rQuote, Name: rChar.Name, Picture: rChar.Picture }
        }
        if (!req.query.amount) {
            console.log("getting random quote")
            // sensible - random by default
            // God this is so horrible
            res.json(getRandomQuoteObject())
        } if (req.query.amount) {
            if (isNaN(parseInt(req.query.amount))) { res.json({ error: "YOU HAVE TO SPECIFY A NUMBER AS AMOUNT, DOOFUS" }) }
            let chars = []
            for (let i = 0; i < req.query.amount; i++) { chars.push(getRandomQuoteObject()) }
            res.json(chars)
        }
        else {
            console.log(req.query)
        }
    })
})

// SEARCH FUNCTION YEAOIAUSODIUASDOIS
let search = app.get(["/search", "/find"], (req, res) => {
    EnterpriseLevelSecurityCheck(req, res).then(passed => {
        let q = req.query.q;
        if (!q) res.json({ error: "no query specified. use ?q=[querystring]" })
        if (q.length < 3) { res.json({ message: "type at least three characters to search" }) } else {
            q = decodeURIComponent(q.toLowerCase());
            let matches = SaaSData.filter(char => {
                let name = char.Name ? char.Name.toLowerCase() : "";
                let occupation = char.Occupation ? char.Occupation.toLowerCase() : "";
                return name.indexOf(q) > -1 || occupation.indexOf(q) > -1
            })
            res.json(matches)
        }
    })
})

// character route
let character = app.get(["/characters", "/api/characters", "/chars", "/characters/random"], (req, res) => {
    console.log(`APIKEY: ${JSON.stringify(req.headers.apikey) || "none"}`)
    EnterpriseLevelSecurityCheck(req, res).then(passed => {
        if (!passed) return;
        let search = req.query;
        if (req.url.indexOf("/random") > -1) {
            const getRandomCharacter = () => SaaSData[randomize(0, SaaSData.length)];
            //return random character
            if (req.query.amount) {
                if (isNaN(parseInt(req.query.amount))) { res.json({ error: "YOU HAVE TO SPECIFY A NUMBER AS AMOUNT, DOOFUS" }) }
                let randomChars = []
                for (let i = 0; i < req.query.amount; i++) { randomChars.push(getRandomCharacter()) }
                res.json(randomChars)
            }
            res.json(SaaSData[randomize(0, SaaSData.length)])
        }
        console.log(`queryprop: ${Object.keys(search)[0]}`)
        if (!Object.keys(search)[0]) { res.send(`<h1>SaaS character-endpoint. Retrieve a character using ?name=[charactername] or ?id=[characterId] </h1>`) } else {
            let queryProp = capitalize(Object.keys(search)[0])
            let queryText = decodeURIComponent(search[queryProp])
            let charResults = SaaSData.filter(char => { if (!char[queryProp]) { return false; } return char[queryProp] == queryText })
            if (charResults.length) { res.json([...charResults]) }
            else {
                res.send(`No character with ${queryProp} ${queryText} in the SaaS-database`)
            }
        }
    });
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
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>

    <head>
        <title>Shitty APIs as a Service</title>
        <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css"
            rel="stylesheet">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:creator" content="@Kimzter">
        <meta name="og:title" content="Shitty APIs as a Service">
        <script src="//code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>
    </head>
    
    <body>
        <div class="container">
            <div class="hero-unit">
                <h1>SAaaS</h1>
                <h2>Shitty APIs as a Service</h2>
                <p><em>v1.0.0</em></p>
            </div>
        </div>
        <div class="container">
            <div class="content" style="margin-left:50px;">
                <h2 id="introduction">Introduction</h2>
                <p>SAaaS (Shitty APIs as a Service) is a minimalist, opinionated, expressive, scalable API-engine, which enables power users to easily create their own APIS, with only basic html and css-knowledge.</p>
                <h2 id="api">Create your own API</h2>
                <h4>go to <a href="http://saaas.puzzlebart.no/create">http://saaas.puzzlebart.no/create</a></h4>
                <table class="table" id="ops">
                    <tr>
                        <th>Path</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>/version</td>
                        <td>Returns the current SAaaS version number.</td>
                    </tr>
                    <tr>
                        <td>/create</td>
                        <td>WYSIWYG Shitty API-creator</td>
                    </tr>
                    <tr>
                        <td>/new</td>
                        <td>Create a new Shitty API using the SAaaS API</td>
                    </tr>
                    <tr>
                        <td>/get</td>
                        <td>Get a Shitty API</td>
                    </tr>
                    <tr>
                        <td>/list</td>
                        <td>list all Shitty APIs</td>
                    </tr>
                    
                    <tr>
                        <td>/doh</td>
                        <td>D'oh! As A Service</td>
                    </tr>
                </table>
                <h3 id="operations">Syntax</h3>
                <p><b>fetch</b></p>
                <code>await fetch("http://SAaaS.puzzlebart.no/new",{method:"POST",headers:{apikey:"YOUR_API_KEY"},body{YOUR_API_DEFINITION}}).then(d=>d.json().then(r=>r))</code>
                <br/>
                <br/>
                <p><b>cURL</b></p>
                <code>It's 03:30, way too late to write cURL script. fuck it</code>
                <p></p>
                <h3 id="operations">Example usage</h3>
                <p>TODO</p>
                <p><a href="https://github.com/puzzlebart/SAaaS">Fork us on github!</a></p>
                <p>Created by <a href="https://twitter.com/Kimzter">@Kimzter</a></p>
            </div>
        </div>
    </body>
    </html>
`)
});

// error route
app.get('(/*)?', (req, res) => {
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
}) // D'oh!

app.listen(process.env.PORT || '3000', () => console.log(`running on port ${process.env.PORT || '3000'}`))