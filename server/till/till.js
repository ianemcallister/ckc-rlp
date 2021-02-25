/*
*   TILL
*
*   This script contains all the till mthods
*/

//  DEFINE DEPENDENCIES
var request = require("request-json");
var url = require("url");

//  DEFINE MODULE
var tillMod = {
    dialogue: dialogue,
    alertTest: alertTest,
    test: test
};

//  INITIATE INSTANCE
var TILL_URL = url.parse(process.env.TILL_URL);
var TILL_BASE = TILL_URL.protocol + "//" + TILL_URL.host;
var TILL_PATH = TILL_URL.pathname;

if(TILL_URL.query != null) {
  TILL_PATH += "?"+TILL_URL.query;
};

//  DIALOGUE METHOD
async function dialogue(phoneNumber, messages) {
  //  DEFINE LOCAL VARIABLES
  //  RETURN
  return 1;
};

//  ALERT TEST
async function alertTest(phoneNumbers, message) {
    request.createClient(TILL_BASE).post(TILL_PATH, {
        "phone": phoneNumbers,
        "text": message
      }, function(err, res, body) {
        return console.log(res.statusCode);
      });
};

//  TEST FUNCTION
async function test() {
    //  DEFINE LOCAL VARIABLES
    request.createClient(TILL_BASE).post(TILL_PATH, {
        "phone": ["15558675309", "15558675308"],
        "questions": [{
        "text": "Favorite color?",
          "tag": "favorite_color",
          "responses": ["Red", "Green", "Yellow"],
          "webhook": "https://yourapp.herokuapp.com/results/"
        }],
        "conclusion": "Thank you for your time"
      }, function(err, res, body) {
        return console.log(res.statusCode);
      });
};

//  EXPORT MODUEL
module.exports = tillMod;