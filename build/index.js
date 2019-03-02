"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// request logger
if (process.platform === "darwin") {
  require("dotenv").config();
} // enterprise-grade MacOS-detection


var app = (0, _express.default)(); // express app instance

app.use((0, _morgan.default)('tiny')); // morgan
//CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Remember to have apikey here, else our enterprise-grade authorization-system will fail

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Cache-Control, Accept, apikey");
  next();
}); // MICKEY MOUSE ENTERPRISE-GRADE SECURITY AS A SERVICE

var superSecretApiKeys = process.env.APIKEYS.split(",");
var doEnterpriseLevelSecurityCheck = true; // ENTERPRISE GRADE RANDOMIZATION ENGINE

var randomize = function randomize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}; // TIHIaaS -  Thanks, I hate it as a Service


var tihi = app.get('/tihi', function (req, res) {
  res.redirect("https://www.youtube.com/watch?v=-Lez_WdX7Oc");
}); // version

var version = app.get("/version", function (req, res) {
  res.json({
    version: "1.0.0"
  });
}); // DaaS - D´oh! as a Service

var doh = app.get('/doh', function (req, res) {
  res.json({
    message: "D'oh!"
  });
}); // D'oh!

var quotes = app.get('/quotes', function (req, res) {
  EnterpriseLevelSecurityCheck(req, res).then(function (passed) {
    // VERY IMPORTANT SECURITY STUUFF
    var charsWithQuotes = SaaSData.filter(function (char) {
      return char.Quotes.length >= 1;
    });

    var getRandomChar = function getRandomChar() {
      return charsWithQuotes[randomize(0, charsWithQuotes.length - 1)];
    };

    var getRandomQuote = function getRandomQuote(char) {
      return char.Quotes.length === 1 ? char.Quotes[0] : char.Quotes[randomize(0, char.Quotes.length - 1)];
    };

    var getRandomQuoteObject = function getRandomQuoteObject() {
      var rChar = getRandomChar();
      var rQuote = getRandomQuote(rChar);
      return {
        Quote: rQuote,
        Name: rChar.Name,
        Picture: rChar.Picture
      };
    };

    if (!req.query.amount) {
      console.log("getting random quote"); // sensible - random by default
      // God this is so horrible

      res.json(getRandomQuoteObject());
    }

    if (req.query.amount) {
      if (isNaN(parseInt(req.query.amount))) {
        res.json({
          error: "YOU HAVE TO SPECIFY A NUMBER AS AMOUNT, DOOFUS"
        });
      }

      var chars = [];

      for (var i = 0; i < req.query.amount; i++) {
        chars.push(getRandomQuoteObject());
      }

      res.json(chars);
    } else {
      console.log(req.query);
    }
  });
}); // SEARCH FUNCTION YEAOIAUSODIUASDOIS

var search = app.get(["/search", "/find"], function (req, res) {
  EnterpriseLevelSecurityCheck(req, res).then(function (passed) {
    var q = req.query.q;
    if (!q) res.json({
      error: "no query specified. use ?q=[querystring]"
    });

    if (q.length < 3) {
      res.json({
        message: "type at least three characters to search"
      });
    } else {
      q = decodeURIComponent(q.toLowerCase());
      var matches = SaaSData.filter(function (char) {
        var name = char.Name ? char.Name.toLowerCase() : "";
        var occupation = char.Occupation ? char.Occupation.toLowerCase() : "";
        return name.indexOf(q) > -1 || occupation.indexOf(q) > -1;
      });
      res.json(matches);
    }
  });
}); // character route

var character = app.get(["/characters", "/api/characters", "/chars", "/characters/random"], function (req, res) {
  console.log("APIKEY: ".concat(JSON.stringify(req.headers.apikey) || "none"));
  EnterpriseLevelSecurityCheck(req, res).then(function (passed) {
    if (!passed) return;
    var search = req.query;

    if (req.url.indexOf("/random") > -1) {
      var getRandomCharacter = function getRandomCharacter() {
        return SaaSData[randomize(0, SaaSData.length)];
      }; //return random character


      if (req.query.amount) {
        if (isNaN(parseInt(req.query.amount))) {
          res.json({
            error: "YOU HAVE TO SPECIFY A NUMBER AS AMOUNT, DOOFUS"
          });
        }

        var randomChars = [];

        for (var i = 0; i < req.query.amount; i++) {
          randomChars.push(getRandomCharacter());
        }

        res.json(randomChars);
      }

      res.json(SaaSData[randomize(0, SaaSData.length)]);
    }

    console.log("queryprop: ".concat(Object.keys(search)[0]));

    if (!Object.keys(search)[0]) {
      res.send("<h1>SaaS character-endpoint. Retrieve a character using ?name=[charactername] or ?id=[characterId] </h1>");
    } else {
      var queryProp = capitalize(Object.keys(search)[0]);
      var queryText = decodeURIComponent(search[queryProp]);
      var charResults = SaaSData.filter(function (char) {
        if (!char[queryProp]) {
          return false;
        }

        return char[queryProp] == queryText;
      });

      if (charResults.length) {
        res.json(_toConsumableArray(charResults));
      } else {
        res.send("No character with ".concat(queryProp, " ").concat(queryText, " in the SaaS-database"));
      }
    }
  });
}); // ENTERPRISE LEVEL SECURITY ENGINE AUTOMATRON - DO NOT TOUCH IT'S PERFECT THANKS

function EnterpriseLevelSecurityCheck(req, res) {
  return new Promise(function (resolve, reject) {
    if (!doEnterpriseLevelSecurityCheck || req.get('host').indexOf("localhost") > -1) {
      resolve(true);
      return;
    }

    if (!req.headers.apikey && !req.query.apikey) {
      res.json({
        error: "NO API KEY SPECIFIED. ASK PUZZLEBART FOR ONE! We're all about sharing :D"
      });
      resolve(false);
    } else {
      if (superSecretApiKeys.includes(req.headers.apikey) || superSecretApiKeys.includes(req.query.apikey)) {
        resolve(true);
      } else {
        res.json({
          error: "WRONG API KEY SPECIFIED - ARE YOU HACKING???!"
        });
        resolve(false);
      }
    }
  });
} // END SECURITIFICATION
// Stupid sexy jslint


var capitalize = function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}; // FRONT PAGE


app.get('/', function (req, res) {
  res.send("<!DOCTYPE html>\n    <html>\n\n    <head>\n        <title>Shitty APIs as a Service</title>\n        <link href=\"//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css\"\n            rel=\"stylesheet\">\n        <meta name=\"twitter:card\" content=\"summary\">\n        <meta name=\"twitter:creator\" content=\"@Kimzter\">\n        <meta name=\"og:title\" content=\"Shitty APIs as a Service\">\n        <script src=\"//code.jquery.com/jquery-3.1.1.min.js\" type=\"text/javascript\"></script>\n    </head>\n    \n    <body>\n        <div class=\"container\">\n            <div class=\"hero-unit\">\n                <h1>SAaaS</h1>\n                <h2>Shitty APIs as a Service</h2>\n                <p><em>v1.0.0</em></p>\n            </div>\n        </div>\n        <div class=\"container\">\n            <div class=\"content\" style=\"margin-left:50px;\">\n                <h2 id=\"introduction\">Introduction</h2>\n                <p>SAaaS (Shitty APIs as a Service) is a minimalist, opinionated, expressive, scalable API-engine, which enables power users to easily create their own APIS, with only basic html and css-knowledge.</p>\n                <h2 id=\"api\">Create your own API</h2>\n                <h4>go to <a href=\"http://saaas.puzzlebart.no/create\">http://saaas.puzzlebart.no/create</a></h4>\n                <table class=\"table\" id=\"ops\">\n                    <tr>\n                        <th>Path</th>\n                        <th>Description</th>\n                    </tr>\n                    <tr>\n                        <td>/version</td>\n                        <td>Returns the current SAaaS version number.</td>\n                    </tr>\n                    <tr>\n                        <td>/create</td>\n                        <td>WYSIWYG Shitty API-creator</td>\n                    </tr>\n                    <tr>\n                        <td>/new</td>\n                        <td>Create a new Shitty API using the SAaaS API</td>\n                    </tr>\n                    <tr>\n                        <td>/get</td>\n                        <td>Get a Shitty API</td>\n                    </tr>\n                    <tr>\n                        <td>/list</td>\n                        <td>list all Shitty APIs</td>\n                    </tr>\n                    \n                    <tr>\n                        <td>/doh</td>\n                        <td>D'oh! As A Service</td>\n                    </tr>\n                </table>\n                <h3 id=\"operations\">Syntax</h3>\n                <p><b>fetch</b></p>\n                <code>await fetch(\"http://SAaaS.puzzlebart.no/new\",{method:\"POST\",headers:{apikey:\"YOUR_API_KEY\"},body{YOUR_API_DEFINITION}}).then(d=>d.json().then(r=>r))</code>\n                <br/>\n                <br/>\n                <p><b>cURL</b></p>\n                <code>It's 02:40, way too late to write cURL script. fuck it</code>\n                <p></p>\n                <h3 id=\"operations\">Example usage</h3>\n                <p>TODO</p>\n                <p><a href=\"https://github.com/puzzlebart/SAaaS\">Fork us on github!</a></p>\n                <p>Created by <a href=\"https://twitter.com/Kimzter\">@Kimzter</a></p>\n            </div>\n        </div>\n    </body>\n    </html>\n");
}); // error route

app.get('(/*)?', function (req, res) {
  res.send("\n<html>\n<head>\n    <title>Simpsons as a Service</title>\n    <link href=\"//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css\" rel=\"stylesheet\">\n    <meta name=\"og:title\" content=\"Simpsons As A Service\">\n    <script src=\"//code.jquery.com/jquery-3.1.1.min.js\" type=\"text/javascript\"></script>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"hero-unit\">\n            <h1>742 - D'oh!</h1>\n            <h2>This is not the shitty API you are looking for</h2>\n            <p><em>Shitty API as a Service v1.0.0</em></p>\n        </div>\n    </div>\n    <center><a href=\"/\">saas.puzzlebart.no</a>\n    </body></html>");
}); // D'oh!

app.listen(process.env.PORT || '3000', function () {
  return console.log("running on port ".concat(process.env.PORT || '3000'));
});
//# sourceMappingURL=index.js.map