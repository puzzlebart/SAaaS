"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _fs = _interopRequireDefault(require("fs"));

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _jsdom = _interopRequireDefault(require("jsdom"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JSDOM = _jsdom.default.JSDOM;

if (process.platform === "darwin") {
  require("dotenv").config();
} // enterprise-grade MacOS-detection


var app = (0, _express.default)(); // express app instance

app.set('view engine', 'ejs');
app.use(_bodyParser.default.json()); // to support JSON-encoded bodies

app.use(_bodyParser.default.urlencoded({
  extended: true
})); // to support URL-encoded bodies 
// app.use(express.static(__dirname + '/public')); // because paths is a PITA
// app.use(express.static("public")); // because paths is a PITA
// @ts-ignore
// const APIS = JSON.parse(fs.readFileSync("./build/apis.json", "utf8"))

var getAPIS = function getAPIS() {
  return _fs.default.readFileSync("./build/apis.json", "utf8");
}; //CORS


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Remember to have apikey here, else our enterprise-grade authorization-system will fail

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Cache-Control, Accept, apikey");
  next();
}); // MICKEY MOUSE ENTERPRISE-GRADE SECURITY AS A SERVICE

var superSecretApiKeys = process.env.APIKEYS.split(",");
var doEnterpriseLevelSecurityCheck = true; // ENTERPRISE GRADE RANDOMIZATION ENGINE

var randomize = function randomize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

app.get('/tihi', function (req, res) {
  res.redirect("https://www.youtube.com/watch?v=-Lez_WdX7Oc");
}); // TIHIaaS -  Thanks, I hate it as a Service

app.get("/version", function (req, res) {
  res.json({
    version: "1.0.0"
  });
}); // version

app.get('/doh', function (req, res) {
  res.json({
    message: "D'oh!"
  });
}); // DaaS - D´oh! as a Service
// GET a named API by title or whatever

app.get('/get', function (req, res) {
  if (!req.query.name) {
    res.json(JSON.parse(getAPIS()));
  } // yeah so no query, you get all, you fool! use /LIST

}); // D'oh!
// list all created apis

app.get("/list", function (req, res) {
  return res.json(JSON.parse(getAPIS()));
});
app.get("/success", function (req, res) {
  return res.render("success");
}); // newform

app.get(["/new", "/create"], function (req, res) {
  return res.render("new");
}); // newform
// postbacks go here. it's so damn secure

app.post(["/new", "/create"], function (req, res) {
  console.log(JSON.stringify(req.body));
  var apiname = req.body.name || "[YOUR_API_NAME]";

  var apiFile = _fs.default.readFileSync("./build/apis.json", "utf8");

  var apiFileReadyForNewEntry = apiFile.substring(0, apiFile.length - 1);

  _fs.default.writeFile("./build/apis.json", "\n".concat(apiFileReadyForNewEntry, ",\n").concat(JSON.stringify(req.body), "]"), function (err, data) {
    // ITS FUCKING GLORIOUS
    if (err) {
      res.render("error");
    } else {
      res.send("\n            <!DOCTYPE html>\n<html>\n\n<head>\n    <title>Shitty APIs as a Service</title>\n    <link href=\"//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css\" rel=\"stylesheet\">\n    <meta name=\"twitter:card\" content=\"summary\">\n    <meta name=\"twitter:creator\" content=\"@Kimzter\">\n    <meta name=\"og:title\" content=\"Shitty APIs as a Service\">\n    <script src=\"//code.jquery.com/jquery-3.1.1.min.js\" type=\"text/javascript\"></script>\n</head>\n\n<body>\n    <div class=\"container\">\n        <div class=\"hero-unit\">\n            <h1>Congratulations on your new shitty API!</h1>\n            <h2>Shitty APIs as a Service</h2>\n            <p><em>v1.0.0</em></p>\n        </div>\n    </div>\n    <div class=\"container\">\n        <div class=\"content\" style=\"margin-left:50px;\">\n            <h2 id=\"introduction\">Your newly created api is accessible at <a href=\"http://saaas.puzzlebart.no/".concat(apiname, "\">http://saaas.puzzlebart.no/").concat(apiname, "</a></h2>\n        </div>\n    </div>\n</body>\n\n</html>\n            "));
    }
  });
}); //Do lol stuff here with cheerio

function executeAPI(_x, _x2) {
  return _executeAPI.apply(this, arguments);
} // ENTERPRISE LEVEL SECURITY ENGINE AUTOMATRON - DO NOT TOUCH IT'S PERFECT THANKS


function _executeAPI() {
  _executeAPI = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var allShittyAPIs, apiName, shittyApiDefinition, url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("----------- EXECUTEAPI ".concat(req.url.substring(1), " -----------"));
            allShittyAPIs = JSON.parse(getAPIS());
            apiName = req.url.substring(1); // if (apiName.indexOf("?")) { apiName = apiName.substring(0, apiName.indexOf("?")) } // HAHAHA SO BAD

            console.log("api definitions: ".concat(JSON.stringify(allShittyAPIs)));
            shittyApiDefinition = allShittyAPIs.filter(function (a) {
              console.log("testing ".concat(a.name, " equal to ").concat(apiName));
              return a.name == apiName;
            })[0]; // we already know it exists 'cause we checked right

            console.log("Found an api definition: ".concat(JSON.stringify(shittyApiDefinition)));

            if (!shittyApiDefinition) {
              console.log("no shitty api definition...");
              res.render("error");
            }

            console.log("THIS IS THE SHITTY API DEFINITION T.I.H.I.");
            console.log(JSON.stringify(shittyApiDefinition));
            url = shittyApiDefinition.url;

            _axios.default.get(url).then(function (r) {
              var data = r.data;
              var dom = new JSDOM(data);
              var document = dom.window.document; // ah it's so familiar
              // ----------------- THIS IS WHERE ALL THE SHITTY MAGIC HAPPENS ---------------------------------------------------

              console.log("SELECTORS: ".concat(shittyApiDefinition.selectors));
              var allTheThings = document.querySelectorAll(shittyApiDefinition.selectors);

              if (allTheThings.length) {
                var allTheShittyEntries = _toConsumableArray(allTheThings).map(function (e) {
                  return {
                    entry: e.textContent.trim()
                  };
                }); // console.log(allTheShittyEntries)


                res.json(allTheShittyEntries);
              } else {
                res.json({
                  message: "no entries in your shitty api"
                });
              }
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _executeAPI.apply(this, arguments);
}

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
}; // NOT IMPLEMENTED


app.get("/501", function (req, res) {
  res.status(501);
  res.render("error");
}); // FRONT PAGE

app.get('/', function (req, res) {
  res.render("index");
});
app.get("/favicon.ico", function (req, res) {
  res.end();
}); // error route

app.get('(/*)?', function (req, res) {
  var allShittyApiNames = JSON.parse(getAPIS()).map(function (a) {
    return "".concat(a.name);
  });
  var apiName = req.url.substring(1).trim();
  console.log("TESTING FOR: ".concat(apiName));
  console.log("AVAILABLE APIS: ".concat(allShittyApiNames));

  if (apiName.indexOf("?") > -1) {
    apiName = apiName.substring(0, apiName.indexOf("?"));
  }

  var matches = allShittyApiNames.filter(function (a) {
    return a.name == apiName;
  });

  if (matches) {
    executeAPI(req, res);
  } else {
    console.log("no match for ".concat(apiName));
    res.render("error");
  }
}); // D'oh!

app.listen(process.env.PORT || '3000', function () {
  return console.log("running on port ".concat(process.env.PORT || '3000'));
});
//# sourceMappingURL=index.js.map