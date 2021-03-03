/*
*   CLI
*
*   This script facilitates development. 
*/

//  NOTIFY STATUS
console.log('running cli');

//  DEFINE DEPENDENCIES
var fs 		          = require('fs');
var path 	          = require('path');
//var DelightCirlce     = require('./crm/delightCircle.js');
var Square            = require('./square/sqr.js');
//var Shopify           = require('./shopify/shopify.js');
//var Till              = require('./till/till.js');
var Firebase          = require('./firebase/firebase.js');
//var Standardops         = require('./crm/standardOps.js');

//  RUN



//Standardops._read.csvFile();

//firebase.test();
//till.alertTest();
//shopify.discountCodes.create('testing12345');
async function result() {
    //await Square.Customers.Get('RDX9Z4XTIZR7MRZJUXNY9HUK6I');
    await Firebase.read.idByChild('/Customers', 'SquareCustomerID', 'J70G0HCB8X3RH69EQXBY5MADC0');
    
}
result();

//square.listLocations();
