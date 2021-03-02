/*
*   STANDARD OPERATIONS FOR 29 KETTLE
*
*/

//  DECLARE DEPENDENCIES
var Square            = require('../square/sqr.js');
var Shopify           = require('../shopify/shopify.js');
var Firebase          = require('../firebase/firebase.js');

//  DEFINE MODULE 
var standOpsMod = {
    SyncCustomers: {
        All: syncAllCustomers,
        Square: syncSquareCustomers,
        Shopify: syncShopifyCustomers,
        Facebook: syncFacebookCustomers,
        IG: syncIGCustomers
    },
    test: test
};

/*
*   SYNC ALL CUSTOMERS
*
*/
async function syncAllCustomers() {};

/*
*   SYNC SQUARE CUSTOMERS
*
*/
async function syncSquareCustomers() {};

/*
*   SYNC SHOPIFY CUSTOMERS
*
*/
async function syncShopifyCustomers() {};

/*
*   SYNC FACEBOOK CUSTOMERS
*
*/
async function syncFacebookCustomers() {};

/*
*   SYNC IG CUSTOMERS
*
*/
async function syncIGCustomers() {};

//  FUNCTION TEST
function test() {
    console.log('this is the starndard Ops Module');
}

//  EXORT MODULE
module.exports = standOpsMod;