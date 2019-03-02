"use strict";

var _apis = _interopRequireDefault(require("./apis.json"));

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

app.set('view engine', 'ejs'); //CORS

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
  res.status(501);
  res.render("error");
}); // D'oh!
// list all created apis

app.get("/list", function (req, res) {
  return res.json(_apis.default);
}); //Do lol stuff here with cheerio

function executeAPI(_x, _x2) {
  return _executeAPI.apply(this, arguments);
} // SEARCH FUNCTION YEAOIAUSODIUASDOIS


function _executeAPI() {
  _executeAPI = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var apiName, shittyApiDefinition, url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("EXECUTEAPI ".concat(req.url.substring(1)));
            apiName = req.url.substring(1).trim();
            shittyApiDefinition = _apis.default.filter(function (a) {
              return a.name === apiName;
            })[0]; // we already know it exists 'cause we checked right

            console.log("THIS IS THE SHITTY API DEFINITION T.I.H.I.");
            console.log(JSON.stringify(shittyApiDefinition));
            url = shittyApiDefinition.url;

            _axios.default.get(url).then(function (r) {
              var data = r.data;
              var dom = new JSDOM(data);
              var document = dom.window.document; // ah it's so familiar
              // THIS IS WHERE ALL THE SHITTY MAGIC HAPPENS

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

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _executeAPI.apply(this, arguments);
}

var search = app.get(["/search", "/find"], function (req, res) {
  EnterpriseLevelSecurityCheck(req, res).then(function (passed) {
    var q = req.query.q;
    if (!q) res.json({
      error: "no query specified. use ?q=[querystring]"
    });

    if (q.length < 1) {
      res.json({
        message: "type at least two characters to search"
      });
    } else {
      q = decodeURIComponent(q.toLowerCase());

      var matches = _apis.default.filter(function (api) {
        var name = api.name ? api.name.toLowerCase() : "";
        return name.indexOf(q) > -1;
      });

      res.json(matches.length ? matches : {
        message: "no shitty API matches :'-("
      });
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
  res.render("index");
});

var matchesAnAPI = function matchesAnAPI(apiName) {
  console.log("checking whether the \"".concat(apiName, "\" api exists"));
  var matches = _apis.default.filter(function (a) {
    return a.name === apiName;
  }).length == 1;
  console.log("api-match: ".concat(matches));
  return matches;
}; // error route


app.get('(/*)?', function (req, res) {
  return matchesAnAPI(req.url.substring(1)) ? executeAPI(req, res) : res.render("error");
}); // D'oh!

app.listen(process.env.PORT || '3000', function () {
  return console.log("running on port ".concat(process.env.PORT || '3000'));
});
//# sourceMappingURL=index.js.map